function Validator(params) {
  const {
    loginInput,
    passwordInput,
    submitBtn,
    backBtn,
    passwordToggleBtn,
    messagesContainer,
    profilePasswordInput,
    errorMessagesList
  } = params;
  let errorMessages = [];

  const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    loginRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function isFieldFilled(input, errorKey) {
    if (input) {
      return true
    } else {
      errorMessages.push(errorMessagesList[errorKey]);
      return false
    }
  }

  function isFieldValid(input, errorKey, re) {
    if (re.test(String(input))) {
      return true
    } else {
      errorMessages.push(errorMessagesList[errorKey]);
      return false
    }
  }

  function isFormValid(loginValue, passwordValue) {
    return isFieldFilled(loginValue, 'requiredEmail')
      && isFieldFilled(passwordValue, 'requiredPassword')
      && isFieldValid(loginValue, 'invalidEmail', loginRe)
      && isFieldValid(passwordValue, 'invalidPassword', passwordRe);
  }

  function isFieldApproved(input, errorKey, compareField) {
    if (input === compareField) {
      return true
    } else {
      errorMessages.push(errorMessagesList[errorKey]);
      return false
    }
  }

  function isFormApproved(loginValue, passwordValue) {
    return isFieldApproved(loginValue, 'wrongLogin', localStorage.getItem('login'))
      && isFieldApproved(passwordValue, 'wrongPassword', localStorage.getItem('password'))
  }

  function clearMessages() {
    errorMessages = [];
    messagesContainer.innerHTML = '';
  }

  function showTab(tabId) {
    let tabEl = document.querySelector(tabId),
      siblings = tabEl.parentElement.children;
    for (let key in siblings) {
      if (siblings.hasOwnProperty(key)) {
        siblings[key].classList.add('d-none');
      }
    }
    tabEl.classList.remove('d-none');
  }

  function renderMessages() {
    let html = '';
    errorMessages.forEach(msg => html += `<li>${msg}</li>`);
    messagesContainer.innerHTML = `<div class="alert alert-danger" role="alert"><ul>${html}</ul></div>`;
  }

  function submitForm(e) {
    e.preventDefault();
    let loginValue = loginInput.value,
      passwordValue = passwordInput.value;

    clearMessages();
    if (isFormValid(loginValue, passwordValue) && isFormApproved(loginValue, passwordValue)) {
      showTab('#profile');
    } else {
      renderMessages();
    }
  }

  function togglePasswordType(e) {
    let btn = e.target,
      btnTitle = btn.innerText,
      btnAlternativeTitle = btn.getAttribute('data-alternative-title');
    if (profilePasswordInput.getAttribute('type') === 'password') {
      profilePasswordInput.setAttribute('type', 'text');
    } else {
      profilePasswordInput.setAttribute('type', 'password');
    }
    btn.innerText = btnAlternativeTitle;
    btn.setAttribute('data-alternative-title', btnTitle);
  }

  this.setLogAndPass = (access) => {
    for (let key in access) {
      localStorage.setItem(key, access[key]);
    }
  };

  this.initComponent = () => {
    submitBtn.addEventListener('click', submitForm);
    backBtn.addEventListener('click', () => showTab('#authorization'));
    passwordToggleBtn.addEventListener('click', togglePasswordType);
  };
}