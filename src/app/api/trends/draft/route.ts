import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const TrendRequestSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1).max(10)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keywords } = TrendRequestSchema.parse(body)

    const results = {
      created: 0,
      failed: [] as { keyword: string; error: string }[]
    }

    for (const keyword of keywords) {
      try {
        const slug = generateSlug(keyword)
        const articleId = `article-${slug}-${Date.now()}`

        // Generate article template content
        const articleTemplate = generateArticleTemplate(keyword)

        const articleData = {
          _id: articleId,
          _type: 'article',
          title: articleTemplate.title,
          slug: { current: `${slug}-${Date.now()}` },
          excerpt: articleTemplate.excerpt,
          body: articleTemplate.body,
          tags: [], // Will be populated based on keyword analysis
          persons: [],
          programs: [],
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Mark as draft by not setting published status
        }

        await writeClient.create(articleData)
        results.created++

      } catch (error) {
        results.failed.push({
          keyword,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Draft creation completed. Created: ${results.created}, Failed: ${results.failed.length}`
    })

  } catch (error) {
    console.error('Trend draft error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateArticleTemplate(keyword: string) {
  return {
    title: `${keyword} とは？今日のポイント3行要約`,
    excerpt: `${keyword}について詳しく解説します。最新のトレンド情報をお届けします。`,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'h1',
        children: [
          {
            _type: 'span',
            text: `${keyword} とは？今日のポイント3行要約`
          }
        ]
      },
      {
        _type: 'block',
        _key: 'summary',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: `${keyword}は現在注目を集めているトピックです。\n\n[ここに3行要約を記入してください]\n\n• ポイント1: [記入してください]\n• ポイント2: [記入してください]\n• ポイント3: [記入してください]`
          }
        ]
      },
      {
        _type: 'block',
        _key: 'broadcast-info',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '放送・配信の基本情報'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'broadcast-table',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '[番組情報テーブルを挿入してください]\n\n放送局: [記入してください]\n放送時間: [記入してください]\n出演者: [記入してください]'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'trending-reason',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '話題の理由'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'trending-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: `${keyword}が話題になっている理由について分析します。\n\n[検索トレンドやSNSでの反響について記入してください]\n\n[ニュース要因や社会的背景について記入してください]`
          }
        ]
      },
      {
        _type: 'block',
        _key: 'how-to-watch',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '視聴方法'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'watch-info',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '[視聴方法について記入してください]\n\n• 地上波: [記入してください]\n• 配信サービス: [記入してください]\n• 見逃し配信: [記入してください]'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'related-people',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '関連人物と過去回'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'people-info',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '[関連する人物や過去の放送について記入してください]'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'summary-section',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'まとめ'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'summary-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: `${keyword}について解説しました。\n\n[読者の次のアクションを促す内容を記入してください]\n\n[今後の展開や関連情報について記入してください]`
          }
        ]
      }
    ]
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Trend draft creation API',
    method: 'POST',
    body: {
      keywords: ['keyword1', 'keyword2']
    },
    note: 'This is a mock implementation. Real implementation would integrate with trend APIs.'
  })
}
