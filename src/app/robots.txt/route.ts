import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const robots = `User-agent: *
Allow: /
Allow: /blog
Allow: /programs
Allow: /people
Allow: /tags
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
