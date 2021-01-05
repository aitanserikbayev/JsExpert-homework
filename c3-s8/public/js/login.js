class LoginForm {
  constructor(validatorModule, initParams) {
    this.validator = validatorModule;
    this.navBar = initParams.navBar;
    this.loginBtn = initParams.loginBtn;
    this.logoutBtn = initParams.logoutBtn;
    this.loginInput = initParams.loginInput;
    this.passwordInput = initParams.passwordInput;
    this.passwordToggleBtn = initParams.passwordToggleBtn;
    this.profilePasswordInput = initParams.profilePasswordInput;
    this.showPasswordText = initParams.showPasswordText;
    this.hidePasswordText = initParams.hidePasswordText;
    this.galleryTab = initParams.galleryTab;
    this.authorizationTab = initParams.authorizationTab;
    this.roleContainer = initParams.roleContainer;
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    this.galleryModule = null;
  }

  initComponent () {
    this.authInitCheck();
    this.initListeners();
  };

  validateUserData (loginInput, passwordInput) {
    return this.validator.submitForm(loginInput, passwordInput);
  };

  getRole () {
    return this.validator.getRole();
  };

  showGallery () {
    this.galleryModule = new ExtendedGallery();
    this.galleryModule.initComponent();
  };

  deleteGallery () {
    this.galleryModule = null;
  };

  static objToArray (obj) {
    return Array.prototype.slice.call(obj);
  };

  static addClass (domEl, className) {
    domEl.classList.add(className);
  };

  static removeClass (domEl, className) {
    domEl.classList.remove(className);
  };

  operateHighlightLink (links, activeLink) {
    links.forEach(item => {
      LoginForm.removeClass(item, 'active');
    });

    if (activeLink) {
      LoginForm.addClass(activeLink, 'active');
    }
  };

  operateShowTab (tabElements, tabEl) {
    tabElements.forEach(item => {
      LoginForm.addClass(item, 'd-none');
    });
    LoginForm.removeClass(tabEl, 'd-none');
  };

  highlightLink (tabId) {
    let activeLink = document.querySelector(`[href="${tabId}"]`),
        links = LoginForm.objToArray(this.navBar.children);

    this.operateHighlightLink(links, activeLink);
  };

  showTab (tabId) {
    let tabEl = document.querySelector(tabId),
        tabElements = LoginForm.objToArray(tabEl.parentElement.children);

    this.operateShowTab(tabElements, tabEl);

    this.highlightLink(tabId);
  };

  showLoggedInElements () {
    this.logoutBtn.classList.remove('d-none');
  };

  hideLoggedInElements () {
    this.logoutBtn.classList.add('d-none');
  };

  togglePasswordType (e) {
    let btn = e.target;
    if (this.profilePasswordInput.getAttribute('type') === 'password') {
      this.profilePasswordInput.setAttribute('type', 'text');
      btn.innerText = this.hidePasswordText;
    } else {
      this.profilePasswordInput.setAttribute('type', 'password');
      btn.innerText = this.showPasswordText;
    }
  };

  logIn (e) {
    e.preventDefault();
    if (this.validateUserData(this.loginInput, this.passwordInput)) {
      this.showTab(this.galleryTab);
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedIn = true;
      localStorage.setItem('role', this.getRole());
      this.roleContainer.innerHTML = this.getRole();
      this.showLoggedInElements();
      this.showGallery();
    }
  };

  logOut (e) {
    e.preventDefault();
    this.showTab(this.authorizationTab);
    localStorage.setItem('isLoggedIn', '');
    this.isLoggedIn = false;
    localStorage.setItem('role', '');
    this.roleContainer.innerHTML = '';
    this.hideLoggedInElements();
    this.deleteGallery();
  };

  authInitCheck () {
    if (this.isLoggedIn) {
      this.showTab(this.galleryTab);
      this.showLoggedInElements();
      this.roleContainer.innerHTML = localStorage.getItem('role');
      this.showGallery();
    } else {
      this.showTab(this.authorizationTab);
      this.hideLoggedInElements();
    }
  };

  initListeners () {
    this.navBar.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isLoggedIn) {
        this.showTab(e.target.hash);
      } else {
        this.loginInput.focus()
      }
    });

    this.loginBtn.addEventListener('click', this.logIn.bind(this));

    this.logoutBtn.addEventListener('click', this.logOut.bind(this));

    this.passwordToggleBtn.addEventListener('click', this.togglePasswordType.bind(this));
  };
}