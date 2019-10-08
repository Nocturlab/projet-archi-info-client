import * as NMat from '../index';

export default class App{
    params: NMatOptions;

    /**
     * NMat.App
     * This allow the creation of a new App
     */
    constructor(options: NMatOptions) {
        this.params = options;
    }
}

interface NMatOptions {
  name: String
  views: NMat.View[]
  listeners?: AppListeners
}

interface AppListeners {
  onLaunch?: Function
  onCreated?: Function
  onLoaded?: Function
}
