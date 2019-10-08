import * as NMat from '../index'

export default class Application {
  params: NMatOptions

  /**
   * NMat.app.Application `NMat.App`
   * This allow the creation of a new App
   */
  constructor(options: NMatOptions) {
    this.params = options
    if (this.params.views == null) this.params.views = new Array()
    if (this.params.activeView instanceof NMat.view.View) {
      this.params.views.push(this.params.activeView)
      this.params.activeView = this.params.activeView.name
    }
  }
}

interface NMatOptions {
  name: String
  views?: NMat.view.View[]
  activeView: String | NMat.view.View
  listeners?: AppListeners
}

interface AppListeners {
  onLaunch?: Function
  onCreated?: Function
  onLoaded?: Function
}
