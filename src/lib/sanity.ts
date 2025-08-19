import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

export const config = {
  projectId: process.env.SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
const builder = createImageUrlBuilder({
  projectId: config.projectId || '',
  dataset: config.dataset || '',
})

export const urlForImage = (source: Image) => {
  return builder.image(source).auto('format').fit('max')
}

// Helper for authenticated requests
export const writeClient = createClient({
  ...config,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})
