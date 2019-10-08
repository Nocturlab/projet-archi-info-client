import * as NMat from '../../index'
import { default as Item, ItemOptions, ItemListeners } from '../Item'

export default class Container extends Item {
  protected params: ContainerOptions

  /**
   * NMat.item.container.Container `NMat.Container`
   * This is the base class of all container elements
   *
   * A container element is an element that can have one or many displayable element inside itself.
   */
  constructor(options: ContainerOptions) {
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

export interface ContainerOptions extends ItemOptions {
  listeners?: ContainerListeners
}

export interface ContainerListeners extends ItemListeners {
  onLaunch?: Function
  onCreated?: Function
  onLoaded?: Function
}
