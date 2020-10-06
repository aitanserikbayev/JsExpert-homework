function Validator(params) {
  const {
    messagesContainer,
    errorMessagesList
  } = params;
  let errorMessages = [];

  const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    loginRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isFieldFilled = (input, errorKey) => {
    if (input) {
      return true
    } else {
      errorMessages.push(errorMessagesList[errorKey]);
      return false
    }
  };

  const isFieldValid = (input, errorKey, re) => {
    if (re.test(String(input))) {
      return true
    } else {
      errorMessages.push(errorMessagesList[errorKey]);
      return false
    }
  };

  const isFormValid = (loginValue, passwordValue) => {
    return isFieldFilled(loginValue, 'requiredEmail')
      && isFieldFilled(passwordValue, 'requiredPassword')
      && isFieldValid(loginValue, 'invalidEmail', loginRe)
      && isFieldValid(passwordValue, 'invalidPassword', passwordRe);
  };

  const isFieldApproved = (input, errorKey, compareField) => {
    if (input === compareField) {
      return true
    } else {
      errorMessages.push(errorMessagesList[errorKey]);
      return false
    }
  };

  const isFormApproved = (loginValue, passwordValue) => {
    return isFieldApproved(loginValue, 'wrongLogin', localStorage.getItem('login'))
      && isFieldApproved(passwordValue, 'wrongPassword', localStorage.getItem('password'))
  };

  const clearMessages = () => {
    errorMessages = [];
    messagesContainer.innerHTML = '';
  };

  const renderMessages = () => {
    let html = '';
    errorMessages.forEach(msg => html += `<li>${msg}</li>`);
    messagesContainer.innerHTML = `<div class="alert alert-danger" role="alert"><ul>${html}</ul></div>`;
  };

  this.submitForm = (loginInput, passwordInput) => {
    let loginValue = loginInput.value,
      passwordValue = passwordInput.value;

    clearMessages();

    if (isFormValid(loginValue, passwordValue) && isFormApproved(loginValue, passwordValue)) {
      loginInput.value = '';
      passwordInput.value = '';
      return true;
    } else {
      renderMessages();
      return false;
    }
  };

  this.setLogAndPass = (access) => {
    for (let key in access) {
      localStorage.setItem(key, access[key]);
    }
  };
}