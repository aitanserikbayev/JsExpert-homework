/* 
*  Схема инициализации приложения
*/

let authorizationInitParams = {
  messagesContainer: document.querySelector('#messages'),
  errorMessagesList: errorMessagesList
};

let loginFormParams = {
  loginInput: document.querySelector('#inputEmail'),
  passwordInput: document.querySelector('#inputPassword'),
  passwordToggleBtn: document.querySelector('#passwordToggleBtn'),
  profilePasswordInput: document.querySelector('#profilePassword'),
  navBar: document.querySelector('#menu'),
  logoutBtn: document.querySelector('#logout'),
  loginBtn: document.querySelector('#submit'),
  showPasswordText: 'Показать пароль',
  hidePasswordText: 'Скрыть пароль',
  galleryTab: '#gallery',
  authorizationTab: '#authorization',
  access: {
    login: 'admin@test.com',
    password: 'passWORD2020'
  }
};

let validatorModule = new Validator(authorizationInitParams);

let galleryModule = new BaseGallery();
// let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule, loginFormParams);
loginForm.initComponent();