import ProfileModel from './profile.model.js'
import ProfileView from './profile.view.js'

export default class ProfileController {
    constructor() {
        this.view = new ProfileView();
        this.model = new ProfileModel();
        this.buttonTitles = {
            showPasswordText: 'Показать пароль',
            hidePasswordText: 'Скрыть пароль'
        }
    }

    togglePasswordType (e) {
        let btn = e.target;
        if (this.view.DOMElements.profilePasswordInput.getAttribute('type') === 'password') {
            this.view.DOMElements.profilePasswordInput.setAttribute('type', 'text');
            btn.innerText = this.buttonTitles.hidePasswordText;
        } else {
            this.view.DOMElements.profilePasswordInput.setAttribute('type', 'password');
            btn.innerText = this.buttonTitles.showPasswordText;
        }
    };

    init() {
        this.view.DOMElements.passwordToggleBtn.addEventListener('click', this.togglePasswordType.bind(this));
    }
}