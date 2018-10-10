import { NEW_MODEL_STATE } from '@/store/lib/mixins'
import { DEFAULT_BUILD } from './constants'

export default {
  ...NEW_MODEL_STATE,
  fetching: false,
  buildFinished: false,
  newModel: DEFAULT_BUILD,
  defaultNewModel: DEFAULT_BUILD,
  choosingGenerator: true
}
