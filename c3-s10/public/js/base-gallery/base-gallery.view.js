export default class BaseGalleryView {
    constructor() {
        this.DOMElements = {
            sortSelect: document.querySelector('#sort'),
            container: document.querySelector('#content')
        }
    }
}