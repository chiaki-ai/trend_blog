import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify this is a cron request (optional security check)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Revalidate main pages
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/programs')
    
    // Revalidate sitemap and feed
    revalidatePath('/sitemap.xml')
    revalidatePath('/feed.xml')
    
    // Revalidate tags for ISR
    revalidateTag('articles')
    revalidateTag('programs')
    revalidateTag('today-programs')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: ['/', '/blog', '/programs', '/sitemap.xml', '/feed.xml']
    })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Daily revalidation endpoint',
    method: 'POST',
    note: 'This endpoint is called by Vercel Cron at 04:00 JST daily'
  })
}
