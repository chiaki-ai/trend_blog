import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  try {
    // Fetch latest 20 articles
    const articles = await sanityClient.fetch(`
      *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...20] {
        title,
        slug,
        excerpt,
        publishedAt,
        updatedAt
      }
    `)

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>トレンドブログ - 番組表×SEO</title>
    <description>テレビ番組とトレンドを組み合わせたSEOブログ</description>
    <link>${baseUrl}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles.map((article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <link>${baseUrl}/blog/${article.slug.current}</link>
      <guid>${baseUrl}/blog/${article.slug.current}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('RSS generation error:', error)
    
    // Fallback RSS
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>トレンドブログ - 番組表×SEO</title>
    <description>テレビ番組とトレンドを組み合わせたSEOブログ</description>
    <link>${baseUrl}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`

    return new NextResponse(fallbackRss, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
