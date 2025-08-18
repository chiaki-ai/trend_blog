import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface SEO {
  title?: string
  description?: string
  ogImage?: Image
  noindex?: boolean
}

export interface Article {
  _id: string
  _type: 'article'
  title: string
  slug: { current: string }
  excerpt: string
  heroImage?: Image
  body: PortableTextBlock[]
  tags?: Tag[]
  persons?: Person[]
  programs?: Program[]
  source?: string
  structuredData?: string
  publishedAt: string
  updatedAt: string
  seo?: SEO
}

export interface Program {
  _id: string
  _type: 'program'
  title: string
  slug: { current: string }
  network: string
  startAt: string
  endAt: string
  episode?: string
  synopsis?: string
  persons?: Person[]
  tags?: Tag[]
  watchLinks?: { label: string; url: string }[]
  structuredData?: string
  publishedAt: string
  updatedAt: string
  seo?: SEO
}

export interface Person {
  _id: string
  _type: 'person'
  name: string
  slug: { current: string }
  avatar?: Image
  bio?: string
  roles?: string[]
  social?: {
    x?: string
    instagram?: string
    site?: string
  }
  publishedAt: string
  updatedAt: string
  seo?: SEO
}

export interface Tag {
  _id: string
  _type: 'tag'
  title: string
  slug: { current: string }
  description?: string
  publishedAt: string
  updatedAt: string
  seo?: SEO
}

export interface SourceFeed {
  _id: string
  _type: 'sourceFeed'
  title: string
  slug: { current: string }
  type: 'rss' | 'csv' | 'api'
  url: string
  enabled: boolean
  note?: string
  publishedAt: string
  updatedAt: string
  seo?: SEO
}
