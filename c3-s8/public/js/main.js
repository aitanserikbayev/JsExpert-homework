let service = new DataService();
let dummyService = new DummyService();

service.getErrorMessages().then((data) => {
    let validationInitParams = {
        messagesContainer: document.querySelector('#messages'),
        errorMessagesList: JSON.parse(data)
    };

    let validatorModule = new Validator(validationInitParams);

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

    let loginForm = new LoginForm(validatorModule, loginFormParams);

    let access = [
        {
            "login": "admin@test.com",
            "password": "Admin2020",
            "role": "adminRole"
        },
        {
            "login": "manager@test.com",
            "password": "Manager2020",
            "role": "managerRole"
        },
        {
            "login": "tester@test.com",
            "password": "Tester2020",
            "role": "testerRole"
        }
    ];

    dummyService.setLogAndPass(access);
    loginForm.initComponent();
}).catch((error) => {
    console.log(`Error ${error}.`)
});