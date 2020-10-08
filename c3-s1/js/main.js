let validationInitParams = {
  messagesContainer: document.querySelector('#messages'),
  errorMessagesList: errorMessagesList
};

let galleryInitParams = {
  addBtn: document.querySelector("#add"),
  countLabel: document.querySelector('#count'),
  sortSelect: document.querySelector('#sort'),
  container: document.querySelector('#content')
};

let loginFormParams = {
  loginInput: document.querySelector('#inputEmail'),
  passwordInput: document.querySelector('#inputPassword'),
  passwordToggleBtn: document.querySelector('#passwordToggleBtn'),
  profilePasswordInput: document.querySelector('#profilePassword'),
  navBar: document.querySelector('#menu'),
  logoutBtn: document.querySelector('#logout'),
  loginBtn: document.querySelector('#submit'),
  roleContainer: document.querySelector('#role'),
  showPasswordText: 'Показать пароль',
  hidePasswordText: 'Скрыть пароль',
  galleryTab: '#gallery',
  authorizationTab: '#authorization'
};

let access = [
  {
    login: 'admin@test.com',
    password: 'Admin2020',
    role: 'adminRole'
  },
  {
    login: 'manager@test.com',
    password: 'Manager2020',
    role: 'managerRole'
  },
  {
    login: 'tester@test.com',
    password: 'Tester2020',
    role: 'testerRole'
  }
];

let dummyService = new DummyService();

let validatorModule = new Validator(validationInitParams);

// let galleryModule = new BaseGallery(galleryInitParams);
let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule, loginFormParams);

dummyService.setLogAndPass(access);
loginForm.initComponent();