import 'kity'
import 'kityminder-core'

import Kityminder from './Kityminder'
import { extendsKityminder } from './extends'

export const kity = window.kity
export const kityminder = window.kityminder
export { Kityminder }

export default Kityminder

extendsKityminder(kityminder)
