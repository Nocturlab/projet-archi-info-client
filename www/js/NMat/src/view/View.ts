import * as NMat from '../index'

export default class View {
  private params: ViewOptions

  /**
   * NMat.view.View
   */
  constructor(options: ViewOptions) {
    this.params = options
  }

  public get name(): String {
    return this.params.name
  }
  public set name(name: String) {
    this.params.name = name
  }
}

interface ViewOptions {
  name: String
  listeners?: ViewListeners
  items?: NMat.item.Item
}

interface ViewListeners {
  onLaunch?: Function
  onCreated?: Function
  onLoaded?: Function
}
