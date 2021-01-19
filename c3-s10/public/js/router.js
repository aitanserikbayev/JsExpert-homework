import utils from './utils.js'
import ExtendedGalleryController from './extended-gallery/extended-gallery.controller.js'
import ProfileController from './profile/profile.controller.js'

export default class Router {
    constructor() {
        this.activatedRoutes = {};
        this.viewElements = {
            "authorization" : document.querySelector('#authorization'),
            "gallery" : document.querySelector('#gallery'),
            "profile" : document.querySelector('#profile'),
            "notFound": document.querySelector('#notFound'),
            "home": document.querySelector('#home')
        };

        this.routerConfig = {
            "": {
                show: () => {
                    this.switchView(this.viewElements.home);
                },
                init: () => {

                }
            },
            "gallery": {
                show: () => {
                    this.switchView(this.viewElements.gallery);
                },
                init: async () => {
                    let controller = new ExtendedGalleryController();
                    await controller.initComponent();
                }
            },
            "profile": {
                show: () => {
                    this.switchView(this.viewElements.profile);
                },
                init: () => {
                    let controller = new ProfileController();
                    controller.init();
                }
            },
            "404": {
                show: () => {
                    this.switchView(this.viewElements.notFound);
                },
                init: () => {
                }
            }
        }
    }

    switchView(el) {
        utils.hideAllViews(utils.objToArray(el.parentElement.children));
        utils.showView(el);
    }

    updateRoute = () => {
        let routeName = document.location.hash.replace(/^#/, '');

        if (this.activatedRoutes[routeName]) {
            this.activatedRoutes[routeName]();
        } else {
            let route = this.routerConfig[routeName];
            if (route) {
                route.init();
                route.show();
                this.activatedRoutes[routeName] = route.show;
            } else {
                this.routerConfig['404'].show();
            }
        }
    }
}