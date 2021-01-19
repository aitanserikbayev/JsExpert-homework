export default class LoginView {
    constructor() {
        this.DOMElements = {
            loginInput: document.querySelector('#inputEmail'),
            passwordInput: document.querySelector('#inputPassword'),
            passwordToggleBtn: document.querySelector('#passwordToggleBtn'),
            profilePasswordInput: document.querySelector('#profilePassword'),
            navBar: document.querySelector('#menu'),
            logoutBtn: document.querySelector('#logout'),
            loginBtn: document.querySelector('#submit'),
            roleContainer: document.querySelector('#role'),
            messagesContainer: document.querySelector('#messages')
        };
    }

    clearMessages () {
        this.errorMessages = [];
        this.DOMElements.messagesContainer.innerHTML = '';
    };

    renderMessages () {
        let html = '';
        this.errorMessages.forEach(msg => html += `<li>${msg}</li>`);
        this.DOMElements.messagesContainer.innerHTML = `<div class="alert alert-danger" role="alert"><ul>${html}</ul></div>`;
    };

    showLoggedInElements (role = localStorage.getItem('role')) {
        this.DOMElements.logoutBtn.classList.remove('d-none');
        this.DOMElements.navBar.classList.remove('d-none');
        localStorage.setItem('role', role);
        this.DOMElements.roleContainer.innerHTML = role;
    };

    hideLoggedInElements () {
        this.DOMElements.logoutBtn.classList.add('d-none');
        this.DOMElements.navBar.classList.add('d-none');
        localStorage.setItem('role', '');
        this.DOMElements.roleContainer.innerHTML = '';
    };
}