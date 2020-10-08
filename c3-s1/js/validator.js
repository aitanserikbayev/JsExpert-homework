let Validator = function (params) {
  this.userRole = '';
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

  const isFormApproved = (loginValue, passwordValue) => {
    let accessData = JSON.parse(localStorage.getItem('access'));
    if (accessData.some(item => item.login === loginValue)) {
      let correctData = accessData.find(item => item.login === loginValue);

      if (correctData.password === passwordValue) {
        this.userRole = correctData.role;
        return true;
      } else {
        errorMessages.push(errorMessagesList['wrongPassword']);
        return false
      }
    } else {
      errorMessages.push(errorMessagesList['wrongLogin']);
      return false
    }
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

  this.getRole = () => {
    return this.userRole;
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
};