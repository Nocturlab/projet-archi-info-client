import * as NMat from '../../index'
import { default as Item, ItemOptions, ItemListeners } from '../Item'

export default class Input extends Item {
  protected params: InputOptions

  /**
   * NMat.item.input.Input
   * This is the base class of all input elements
   *
   * A input element is an element that be triggered by a click or by typing text inside.
   */
  constructor(options: InputOptions) {
    super(options)
    this.params = options
  }

  public get name(): String {
    return this.params.name
  }
  public set name(name: String) {
    this.params.name = name
  }
}

export interface InputOptions extends ItemOptions {
  listeners?: InputListeners
}

export interface InputListeners extends ItemListeners {
  onLaunch?: Function
  onCreated?: Function
  onLoaded?: Function
}
