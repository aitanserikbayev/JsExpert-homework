(function () {
  const access = {
    login: 'admin@test.com',
    password: 'passWORD2020'
  };

  let authorizationInitParams = {
    loginInput: document.querySelector('#inputEmail'),
    passwordInput: document.querySelector('#inputPassword'),
    submitBtn: document.querySelector('#submit'),
    backBtn: document.querySelector('#back'),
    passwordToggleBtn: document.querySelector('#passwordToggleBtn'),
    messagesContainer: document.querySelector('#messages'),
    profilePasswordInput: document.querySelector('#profilePassword'),
    errorMessagesList: errorMessagesList
  };

  const validator = new Validator(authorizationInitParams);

  validator.setLogAndPass(access);
  validator.initComponent();
})();