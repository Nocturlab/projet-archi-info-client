import * as NMat from '../index';

export default class View{

    params: ViewOptions;

    /**
     *
     */
    constructor(options: ViewOptions) {
        this.params = options;
    }
}

interface ViewOptions {
    name: String
    views: NMat.View[]
    listeners?: ViewListeners
}

interface ViewListeners {
    onLaunch?: Function
    onCreated?: Function
    onLoaded?: Function
}
