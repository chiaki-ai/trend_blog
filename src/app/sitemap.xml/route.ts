import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  try {
    // Fetch all published content
    const [articles, programs, persons, tags] = await Promise.all([
      sanityClient.fetch(`
        *[_type == "article" && defined(slug.current)] {
          slug,
          publishedAt,
          updatedAt
        }
      `),
      sanityClient.fetch(`
        *[_type == "program" && defined(slug.current)] {
          slug,
          publishedAt,
          updatedAt
        }
      `),
      sanityClient.fetch(`
        *[_type == "person" && defined(slug.current)] {
          slug,
          publishedAt,
          updatedAt
        }
      `),
      sanityClient.fetch(`
        *[_type == "tag" && defined(slug.current)] {
          slug,
          publishedAt,
          updatedAt
        }
      `)
    ])

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/programs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${articles.map((article: any) => `
  <url>
    <loc>${baseUrl}/blog/${article.slug.current}</loc>
    <lastmod>${article.updatedAt || article.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${programs.map((program: any) => `
  <url>
    <loc>${baseUrl}/programs/${program.slug.current}</loc>
    <lastmod>${program.updatedAt || program.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${persons.map((person: any) => `
  <url>
    <loc>${baseUrl}/people/${person.slug.current}</loc>
    <lastmod>${person.updatedAt || person.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('')}
  ${tags.map((tag: any) => `
  <url>
    <loc>${baseUrl}/tags/${tag.slug.current}</loc>
    <lastmod>${tag.updatedAt || tag.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`).join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    // Fallback sitemap with static pages
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/programs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}
