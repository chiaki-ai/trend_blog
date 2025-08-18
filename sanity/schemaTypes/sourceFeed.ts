import {defineType} from 'sanity'

export const sourceFeed = defineType({
  name: 'sourceFeed',
  title: 'Source Feed',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'RSS Feed', value: 'rss'},
          {title: 'CSV Import', value: 'csv'},
          {title: 'API Endpoint', value: 'api'},
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
      description: 'Internal notes about this feed',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      enabled: 'enabled',
    },
    prepare(selection) {
      const {title, type, enabled} = selection
      const status = enabled ? '✅' : '❌'
      return {
        title,
        subtitle: `${type.toUpperCase()} ${status}`,
      }
    },
  },
})
