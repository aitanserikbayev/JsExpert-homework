let LoginForm = function (validatorModule, initParams) {
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
};

LoginForm.prototype = {

  initComponent: function () {
    this.authInitCheck();
    this.initListeners();
  },

  validateUserData: function (loginInput, passwordInput) {
    return this.validator.submitForm(loginInput, passwordInput);
  },

  getRole: function () {
    return this.validator.getRole();
  },

  showGallery: function () {
    this.galleryModule = new ExtendedGallery();
    this.galleryModule.initComponent();
  },

  deleteGallery: function () {
    this.galleryModule = null;
  },

  objToArray: function (obj) {
    return Array.prototype.slice.call(obj);
  },

  addClass: function (domEl, className) {
    domEl.classList.add(className);
  },

  removeClass: function (domEl, className) {
    domEl.classList.remove(className);
  },

  operateHighlightLink: function (links, activeLink) {
    links.forEach(item => {
      this.removeClass(item, 'active');
    });

    if (activeLink) {
      this.addClass(activeLink, 'active');
    }
  },

  operateShowTab: function (tabElements, tabEl) {
    tabElements.forEach(item => {
      this.addClass(item, 'd-none');
    });
    this.removeClass(tabEl, 'd-none');
  },

  highlightLink: function (tabId) {
    let activeLink = document.querySelector(`[href="${tabId}"]`),
      links = this.objToArray(this.navBar.children);

    this.operateHighlightLink(links, activeLink);
  },

  showTab: function (tabId) {
    let tabEl = document.querySelector(tabId),
      tabElements = this.objToArray(tabEl.parentElement.children);

    this.operateShowTab(tabElements, tabEl);

    this.highlightLink(tabId);
  },

  showLoggedInElements: function () {
    this.logoutBtn.classList.remove('d-none');
  },

  hideLoggedInElements: function () {
    this.logoutBtn.classList.add('d-none');
  },

  togglePasswordType: function (e) {
    let btn = e.target;
    if (this.profilePasswordInput.getAttribute('type') === 'password') {
      this.profilePasswordInput.setAttribute('type', 'text');
      btn.innerText = this.hidePasswordText;
    } else {
      this.profilePasswordInput.setAttribute('type', 'password');
      btn.innerText = this.showPasswordText;
    }
  },

  logIn: function (e) {
    e.preventDefault();
    if (this.validateUserData(this.loginInput, this.passwordInput)) {
      this.showTab(this.galleryTab);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', this.getRole());
      this.roleContainer.innerHTML = this.getRole();
      this.showLoggedInElements();
      this.showGallery();
    }
  },

  logOut: function (e) {
    e.preventDefault();
    this.showTab(this.authorizationTab);
    localStorage.setItem('isLoggedIn', '');
    localStorage.setItem('role', '');
    this.roleContainer.innerHTML = '';
    this.hideLoggedInElements();
    this.deleteGallery();
  },

  authInitCheck: function () {
    if (this.isLoggedIn) {
      this.showTab(this.galleryTab);
      this.showLoggedInElements();
      this.roleContainer.innerHTML = localStorage.getItem('role');
      this.showGallery();
    } else {
      this.showTab(this.authorizationTab);
      this.hideLoggedInElements();
    }
  },

  initListeners: function () {
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
  }
};