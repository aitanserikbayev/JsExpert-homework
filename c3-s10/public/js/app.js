import LoginController from './login/login.controller.js'
import Router from './router.js'
import utils from './utils.js'

let loginController = new LoginController();
let router = new Router();

export default class App {
    constructor() {
        this.authorizationPage = document.querySelector('#authorization');
        this.activatedConfigItems = {};
        this.authorizationConfig = {
            "loggedOut" : {
                show: () => {
                    utils.showView(this.authorizationPage);
                    console.log('logged out');
                },
                init: async () => {
                    await loginController.init();
                }
            },
            "loggedIn": {
                show: () => {
                    console.log('logged in');
                },
                init: () => {
                    loginController.initLogOutBtn();
                    loginController.view.showLoggedInElements();
                    App.bindListeners();
                }
            }
        };
    }

    static bindListeners() {
        window.addEventListener('load', router.updateRoute);
        window.addEventListener('hashchange', router.updateRoute);
    }

    updateAuthorizationStatus() {
        let config = loginController.isLoggedIn ? 'loggedIn' : 'loggedOut';
        if (this.activatedConfigItems[config]) {
            this.activatedConfigItems[config]()
        } else {
            let newConfig = this.authorizationConfig[config];
            newConfig.init();
            newConfig.show();
            this.activatedConfigItems[config] = newConfig.show;
        }
    }

    init() {
        this.updateAuthorizationStatus();
    }
}