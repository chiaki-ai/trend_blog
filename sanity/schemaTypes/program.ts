import {defineType} from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '番組名 + サブタイトル',
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
      name: 'network',
      title: 'Network',
      type: 'string',
      description: 'テレビ局/配信サービス',
      validation: Rule => Rule.required(),
    },
    {
      name: 'startAt',
      title: 'Start Time (JST)',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'endAt',
      title: 'End Time (JST)',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'episode',
      title: 'Episode',
      type: 'string',
      description: '第○話、#○など',
    },
    {
      name: 'synopsis',
      title: 'Synopsis',
      type: 'text',
      rows: 4,
    },
    {
      name: 'persons',
      title: 'Cast & Crew',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    },
    {
      name: 'watchLinks',
      title: 'Watch Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'structuredData',
      title: 'Structured Data (JSON)',
      type: 'text',
      rows: 10,
      description: 'JSON-LD structured data (TVEpisode or TVSeries)',
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
      network: 'network',
      startAt: 'startAt',
    },
    prepare(selection) {
      const {title, network, startAt} = selection
      const startTime = startAt ? new Date(startAt).toLocaleString('ja-JP') : 'No time'
      return {
        title,
        subtitle: `${network} - ${startTime}`,
      }
    },
  },
})
