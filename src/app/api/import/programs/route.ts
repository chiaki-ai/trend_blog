import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const ImportTokenSchema = z.string().min(1)

const ProgramRowSchema = z.object({
  title: z.string().min(1),
  network: z.string().min(1),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  episode: z.string().optional(),
  synopsis: z.string().optional(),
  persons: z.string().optional(), // comma-separated names
  watchLinks: z.string().optional(), // JSON string
})

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const importToken = request.headers.get('X-Import-Token')
    if (!importToken || importToken !== process.env.X_IMPORT_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const csvText = await file.text()
    const lines = csvText.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV must have header and at least one data row' },
        { status: 400 }
      )
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const dataRows = lines.slice(1)

    const results = {
      created: 0,
      updated: 0,
      failed: [] as { row: number; error: string; data: any }[]
    }

    for (let i = 0; i < dataRows.length; i++) {
      try {
        const values = dataRows[i].split(',').map(v => v.trim().replace(/"/g, ''))
        const rowData: any = {}
        
        headers.forEach((header, index) => {
          rowData[header] = values[index] || ''
        })

        // Validate row data
        const validatedData = ProgramRowSchema.parse({
          title: rowData.title,
          network: rowData.network,
          startAt: new Date(rowData.startAt).toISOString(),
          endAt: new Date(rowData.endAt).toISOString(),
          episode: rowData.episode || undefined,
          synopsis: rowData.synopsis || undefined,
          persons: rowData.persons || undefined,
          watchLinks: rowData.watchLinks || undefined,
        })

        // Process persons
        const personRefs = []
        if (validatedData.persons) {
          const personNames = validatedData.persons.split(',').map(name => name.trim())
          for (const name of personNames) {
            if (name) {
              const slug = generateSlug(name)
              // Upsert person
              const person = await writeClient
                .createIfNotExists({
                  _id: `person-${slug}`,
                  _type: 'person',
                  name,
                  slug: { current: slug },
                  publishedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                })
              personRefs.push({ _type: 'reference', _ref: person._id })
            }
          }
        }

        // Process watch links
        let watchLinks = []
        if (validatedData.watchLinks) {
          try {
            watchLinks = JSON.parse(validatedData.watchLinks)
          } catch {
            // If JSON parsing fails, ignore watch links
          }
        }

        // Create/update program
        const programSlug = generateSlug(validatedData.title)
        const programId = `program-${programSlug}`

        const programData = {
          _id: programId,
          _type: 'program',
          title: validatedData.title,
          slug: { current: programSlug },
          network: validatedData.network,
          startAt: validatedData.startAt,
          endAt: validatedData.endAt,
          episode: validatedData.episode,
          synopsis: validatedData.synopsis,
          persons: personRefs,
          watchLinks,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // Check if program exists
        const existingProgram = await writeClient.getDocument(programId)
        
        if (existingProgram) {
          await writeClient.createOrReplace({
            ...programData,
            _rev: existingProgram._rev,
          })
          results.updated++
        } else {
          await writeClient.create(programData)
          results.created++
        }

      } catch (error) {
        results.failed.push({
          row: i + 2, // +2 because we start from line 2 (after header)
          error: error instanceof Error ? error.message : 'Unknown error',
          data: dataRows[i]
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Import completed. Created: ${results.created}, Updated: ${results.updated}, Failed: ${results.failed.length}`
    })

  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Program import API',
    method: 'POST',
    headers: {
      'X-Import-Token': 'Required'
    },
    body: 'multipart/form-data with file field',
    csvFormat: {
      headers: ['title', 'network', 'startAt', 'endAt', 'episode', 'synopsis', 'persons', 'watchLinks'],
      example: 'title,network,startAt,endAt,episode,synopsis,persons,watchLinks\n"Sample Drama","Fuji TV","2025-08-18T21:00:00+09:00","2025-08-18T21:54:00+09:00","Episode 1","A sample drama","Actor A,Actor B","[{\\"label\\":\\"FOD\\",\\"url\\":\\"https://fod.fujitv.co.jp\\"}]"'
    }
  })
}
