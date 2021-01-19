import LoginView from './login.view.js';
import LoginModel from './login.model.js';

export default class LoginController {
    constructor() {
        this.view = new LoginView();
        this.model = new LoginModel();
        this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
        this.userRole = !!localStorage.getItem('role');
        this.errorMessagesList = [];
        this.errorMessages = [];
    }

    isFieldFilled (input, errorKey) {
        if (input) {
            return true
        } else {
            this.errorMessages.push(this.errorMessagesList[errorKey]);
            return false
        }
    };

    isFieldValid (input, errorKey, re) {
        if (re.test(String(input))) {
            return true
        } else {
            this.errorMessages.push(this.errorMessagesList[errorKey]);
            return false
        }
    };

    isFormValid (loginValue, passwordValue) {
        const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
            loginRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return this.isFieldFilled(loginValue, 'requiredEmail')
            && this.isFieldFilled(passwordValue, 'requiredPassword')
            && this.isFieldValid(loginValue, 'invalidEmail', loginRe)
            && this.isFieldValid(passwordValue, 'invalidPassword', passwordRe);
    };

    async isFormApproved (loginValue, passwordValue) {
        let accessData = await this.model.getAccessData();
        if (accessData.some(item => item.login === loginValue)) {
            let correctData = accessData.find(item => item.login === loginValue);

            if (correctData.password === passwordValue) {
                this.userRole = correctData.role;
                return true;
            } else {
                this.errorMessages.push(this.errorMessagesList['wrongPassword']);
                return false
            }
        } else {
            this.errorMessages.push(this.errorMessagesList['wrongLogin']);
            return false
        }
    };

    async submitForm (loginInput, passwordInput) {
        let loginValue = loginInput.value,
            passwordValue = passwordInput.value;

        this.view.clearMessages();

        if (this.isFormValid(loginValue, passwordValue) && await this.isFormApproved(loginValue, passwordValue)) {
            loginInput.value = '';
            passwordInput.value = '';
            return true;
        } else {
            this.view.renderMessages();
            return false;
        }
    };

    async validateUserData (loginInput, passwordInput) {
        return await this.submitForm(loginInput, passwordInput);
    };

    async logIn (e) {
        e.preventDefault();
        if (await this.validateUserData(this.view.DOMElements.loginInput, this.view.DOMElements.passwordInput)) {
            localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedIn = true;
            this.view.showLoggedInElements(this.userRole);
            location.reload();
        }
    };

    logOut (e) {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', '');
        this.isLoggedIn = false;
        this.view.hideLoggedInElements();
        location.reload();
    };

    initLogInBtn () {
        this.view.DOMElements.loginBtn.addEventListener('click', this.logIn.bind(this));
    }

    initLogOutBtn () {
        this.view.DOMElements.logoutBtn.addEventListener('click', this.logOut.bind(this));
    }

    async init(callback) {
        this.errorMessagesList = await this.model.getErrorMessages();
        this.initLogInBtn(callback);
    }
}