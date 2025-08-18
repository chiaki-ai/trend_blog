import {defineType} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    },
    {
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '俳優', value: 'actor'},
          {title: '女優', value: 'actress'},
          {title: '声優', value: 'voice_actor'},
          {title: '監督', value: 'director'},
          {title: 'プロデューサー', value: 'producer'},
          {title: '脚本家', value: 'writer'},
          {title: '司会者', value: 'host'},
          {title: 'ナレーター', value: 'narrator'},
          {title: 'ゲスト', value: 'guest'},
          {title: 'その他', value: 'other'},
        ],
      },
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'x',
          title: 'X (Twitter)',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'site',
          title: 'Official Website',
          type: 'url',
        },
      ],
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
      title: 'name',
      media: 'avatar',
      roles: 'roles',
    },
    prepare(selection) {
      const {title, media, roles} = selection
      const rolesList = roles ? roles.join(', ') : 'No roles'
      return {
        title,
        media,
        subtitle: rolesList,
      }
    },
  },
})
