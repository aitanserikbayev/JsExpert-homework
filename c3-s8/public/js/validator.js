class Validator {
    constructor(params) {
        this.userRole = '';
        this.messagesContainer = params.messagesContainer;
        this.errorMessagesList = params.errorMessagesList;
        this.errorMessages = [];
    }

    isFieldFilled = (input, errorKey) => {
        if (input) {
            return true
        } else {
            this.errorMessages.push(this.errorMessagesList[errorKey]);
            return false
        }
    };

    isFieldValid = (input, errorKey, re) => {
        if (re.test(String(input))) {
            return true
        } else {
            this.errorMessages.push(this.errorMessagesList[errorKey]);
            return false
        }
    };

    isFormValid = (loginValue, passwordValue) => {
        const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
            loginRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return this.isFieldFilled(loginValue, 'requiredEmail')
            && this.isFieldFilled(passwordValue, 'requiredPassword')
            && this.isFieldValid(loginValue, 'invalidEmail', loginRe)
            && this.isFieldValid(passwordValue, 'invalidPassword', passwordRe);
    };

  isFormApproved = (loginValue, passwordValue) => {
    let accessData = JSON.parse(localStorage.getItem('access'));
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

    clearMessages = () => {
        this.errorMessages = [];
        this.messagesContainer.innerHTML = '';
    };

    renderMessages = () => {
        let html = '';
        this.errorMessages.forEach(msg => html += `<li>${msg}</li>`);
        this.messagesContainer.innerHTML = `<div class="alert alert-danger" role="alert"><ul>${html}</ul></div>`;
    };

    getRole = () => {
        return this.userRole;
    };

    submitForm = (loginInput, passwordInput) => {
        let loginValue = loginInput.value,
            passwordValue = passwordInput.value;

        this.clearMessages();

        if (this.isFormValid(loginValue, passwordValue) && this.isFormApproved(loginValue, passwordValue)) {
            loginInput.value = '';
            passwordInput.value = '';
            return true;
        } else {
            this.renderMessages();
            return false;
        }
    };
}