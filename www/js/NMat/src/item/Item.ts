import * as NMat from '../index'
import { isNullOrUndefined } from 'util'

export default class Item {
  protected params: ItemOptions

  /**
   * NMat.item.Item
   * This is the base class of all display elements
   */
  constructor(options: ItemOptions) {
    this.params = options
    if (isNullOrUndefined(options.element)) {
    }
  }

  public get name(): String {
    return this.params.name
  }
  public set name(name: String) {
    this.params.name = name
  }
}

export interface ItemOptions {
  id: String
  name: String
  element?: HTMLElement
  listeners?: ItemListeners
}

export interface ItemListeners {
  onLaunch?: Function
  onCreated?: Function
  onLoaded?: Function
}
