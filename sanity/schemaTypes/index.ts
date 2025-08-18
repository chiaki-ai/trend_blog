import {article} from './article'
import {program} from './program'
import {person} from './person'
import {tag} from './tag'
import {sourceFeed} from './sourceFeed'
import {seo} from './objects/seo'

export const schemaTypes = [
  // Documents
  article,
  program,
  person,
  tag,
  sourceFeed,
  // Objects
  seo,
]
