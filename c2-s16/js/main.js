const app = (function () {
  const access = {
    login: 'admin@test.com',
    password: 'passWORD2020'
  };
  let loginInput = document.querySelector('#inputEmail'),
    passwordInput = document.querySelector('#inputPassword'),
    submitBtn = document.querySelector('#submit'),
    backBtn = document.querySelector('#back'),
    passwordToggleBtn = document.querySelector('#passwordToggleBtn'),
    messagesContainer = document.querySelector('#messages'),
    authorizationBlock = document.querySelector('#authorization'),
    profileBlock = document.querySelector('#profile'),
    errorMessages = {};

  function isValidEmail(email) {
    if (!!email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    } else {
      return true
    }
  }

  function isValidPassword(password) {
    if (!!password) {
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return re.test(String(password));
    } else {
      return true
    }
  }

  function togglePasswordType() {
    let input = document.querySelector('#profilePassword'),
        btn = this,
        btnTitle = btn.innerText,
        btnAlternativeTitle = btn.getAttribute('data-alternative-title');
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
    btn.innerText = btnAlternativeTitle;
    btn.setAttribute('data-alternative-title', btnTitle);
  }

  function addErrorMessage(key) {
    errorMessages[key] = allErrorMessages[key];
  }

  function removeErrorMessage(key) {
    delete errorMessages[key];
  }

  function toggleErrorMessage(isValid, messageKey) {
    isValid ? removeErrorMessage(messageKey) : addErrorMessage(messageKey);
  }

  function renderMessages() {
    let html = '';
    for (let key in errorMessages) {
      html += `<li>${errorMessages[key]}</li>`
    }
    messagesContainer.innerHTML = html ? `<div class="alert alert-danger" role="alert"><ul>${html}</ul></div>` : '';
  }

  function clearMessages() {
    errorMessages = {};
    messagesContainer.innerHTML = '';
  }

  Object.size = function (obj) {
    let size = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  function isEqual(a, b) {
    return a === b
  }

  function goToProfile() {
    authorizationBlock.classList.add('d-none');
    profileBlock.classList.remove('d-none');
  }

  function goToAuthorization() {
    profileBlock.classList.add('d-none');
    authorizationBlock.classList.remove('d-none');
  }

  function validateForm(loginValue, passwordValue) {
    clearMessages();
    toggleErrorMessage(!!loginValue, 'requiredEmail');
    toggleErrorMessage(isValidEmail(loginValue), 'invalidEmail');
    toggleErrorMessage(!!passwordValue, 'requiredPassword');
    toggleErrorMessage(isValidPassword(passwordValue), 'invalidPassword');

    if (!Object.size(errorMessages)) {
      toggleErrorMessage(isEqual(loginValue, localStorage.getItem('login')), 'wrongLogin');
      toggleErrorMessage(isEqual(passwordValue, localStorage.getItem('password')), 'wrongPassword');
    }

    return !Object.size(errorMessages);
  }

  function submitForm(e) {
    e.preventDefault();
    let loginValue = loginInput.value,
      passwordValue = passwordInput.value;

    if (validateForm(loginValue, passwordValue)) {
      clearMessages();
      goToProfile()
    } else {
      renderMessages();
    }
  }

  function setLogAndPass() {
    for (let key in access) {
      localStorage.setItem(key, access[key]);
    }
  }

  function initComponent() {
    submitBtn.addEventListener('click', submitForm);
    backBtn.addEventListener('click', goToAuthorization);
    passwordToggleBtn.addEventListener('click', togglePasswordType);
  }

  return {
    setLogAndPass, initComponent
  }
})();

app.setLogAndPass();
app.initComponent();