/* 
*  Схематическое изображение класса Логин формы
*/

let LoginForm = function (validatorModule, galleryModule, initParams) {
  this.validator = validatorModule;
  this.gallery = galleryModule;
  this.access = initParams.access;
  const {
    navBar,
    loginBtn, logoutBtn,
    loginInput, passwordInput,
    passwordToggleBtn, profilePasswordInput,
    showPasswordText, hidePasswordText,
    galleryTab, authorizationTab
  } = initParams;
  this.isLoggedIn = !!localStorage.getItem('isLoggedIn');

  const highlightLink = () => {
    let wrapper = document.querySelector('main'),
      tabs = Array.prototype.slice.call(wrapper.children),
      activeBlock = tabs.find((item) => !item.classList.contains('d-none')),
      activeBlockId = activeBlock.getAttribute('id'),
      activeLink = document.querySelector(`[href="#${activeBlockId}"]`),
      links = navBar.children;

    for (let key in links) {
      if (links.hasOwnProperty(key)) {
        links[key].classList.remove('active');
      }
    }

    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  const showTab = (tabId) => {
    let tabEl = document.querySelector(tabId),
      siblings = tabEl.parentElement.children;
    for (let key in siblings) {
      if (siblings.hasOwnProperty(key)) {
        siblings[key].classList.add('d-none');
      }
    }
    tabEl.classList.remove('d-none');

    highlightLink();
  };

  const showLoggedInElements = () => {
    logoutBtn.classList.remove('d-none');
  };

  const hideLoggedInElements = () => {
    logoutBtn.classList.add('d-none');
  };

  const togglePasswordType = (e) => {
    let btn = e.target;
    if (profilePasswordInput.getAttribute('type') === 'password') {
      profilePasswordInput.setAttribute('type', 'text');
      btn.innerText = hidePasswordText;
    } else {
      profilePasswordInput.setAttribute('type', 'password');
      btn.innerText = showPasswordText;
    }
  };

  const logIn = (e) => {
    e.preventDefault();
    if (this.validateUserData(loginInput, passwordInput)) {
      showTab('#gallery');
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      showLoggedInElements();
    }
  };

  const logOut = (e) => {
    e.preventDefault();
    showTab('#authorization');
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', '');
    hideLoggedInElements();
  };

  this.authInitCheck = () => {
    if (this.isLoggedIn) {
      showTab(galleryTab);
      showLoggedInElements();
    } else {
      showTab(authorizationTab);
      hideLoggedInElements();
    }
  };

  this.initListeners = () => {
    navBar.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isLoggedIn) {
        showTab(e.target.hash);
      } else {
        loginInput.focus()
      }
    });

    loginBtn.addEventListener('click', logIn);

    logoutBtn.addEventListener('click', logOut);

    passwordToggleBtn.addEventListener('click', togglePasswordType);
  };
};

LoginForm.prototype = {

  initComponent: function () {
    this.setLogAndPass();
    this.authInitCheck();
    this.initListeners();
    this.showGallery();
  },

  validateUserData: function (loginInput, passwordInput) {
    return this.validator.submitForm(loginInput, passwordInput);
  },

  setLogAndPass: function () {
    this.validator.setLogAndPass(this.access);
  },

  showGallery: function () {
    this.gallery.initComponent();
  }
};