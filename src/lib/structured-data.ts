import type { Article, Program, Person } from './types'

export function generateArticleStructuredData(article: Article, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.heroImage ? `${baseUrl}${article.heroImage}` : undefined,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "トレンドブログ",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "トレンドブログ",
      "url": baseUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.slug.current}`
    }
  }
}

export function generateProgramStructuredData(program: Program, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": program.title,
    "description": program.synopsis,
    "episodeNumber": program.episode,
    "startDate": program.startAt,
    "endDate": program.endAt,
    "partOfTVSeries": {
      "@type": "TVSeries",
      "name": program.title.split('「')[0]?.trim() || program.title
    },
    "broadcastOfEvent": {
      "@type": "BroadcastEvent",
      "startDate": program.startAt,
      "endDate": program.endAt,
      "publishedOn": {
        "@type": "BroadcastService",
        "name": program.network
      }
    },
    "url": `${baseUrl}/programs/${program.slug.current}`
  }
}

export function generatePersonStructuredData(person: Person, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "description": person.bio,
    "image": person.avatar ? `${baseUrl}${person.avatar}` : undefined,
    "sameAs": [
      person.social?.site,
      person.social?.x,
      person.social?.instagram
    ].filter(Boolean),
    "url": `${baseUrl}/people/${person.slug.current}`,
    "jobTitle": person.roles?.join(', ')
  }
}

export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}
