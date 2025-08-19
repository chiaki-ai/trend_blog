import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

// Conditionally import visionTool to avoid build errors
let visionTool: any = null
try {
  visionTool = require('@sanity/vision').visionTool
} catch (e) {
  // Vision tool not available, skip it
}

export default defineConfig({
  name: 'default',
  title: 'Trend Blog',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), ...(visionTool ? [visionTool()] : [])],

  schema: {
    types: schemaTypes,
  },
})
