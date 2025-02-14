// Add the class active to the container and start transitions when register and login button are clicked (in the welcome and welcome back boxes)
const regBtn = document.querySelector('.slider-register-btn');
const logBtn = document.querySelector('.slider-login-btn');
const container = document.querySelector('.container');

regBtn.addEventListener('click', () => {
    container.classList.toggle('active');
});
logBtn.addEventListener('click', () => {
    container.classList.toggle('active');
});

// Change visibility of the password input fields when the eye icon is clicked
const togglePwIconReg = document.querySelector('.pw-svg-reg');
const togglePwIconLog = document.querySelector('.pw-svg-log');
const pwFieldReg = document.querySelector('.pw-field-reg');
const pwFieldLog = document.querySelector('.pw-field-log');

togglePwIconReg.addEventListener('click', () => {
    if (pwFieldReg.type === "password") {
        pwFieldReg.type = "text";
        togglePwIconReg.innerHTML = feather.icons['eye-off'].toSvg();
    }
    else {
        pwFieldReg.type = "password";
        togglePwIconReg.innerHTML = feather.icons['eye'].toSvg();
    }
    feather.replace();
})

togglePwIconLog.addEventListener('click', () => {
    if (pwFieldLog.type === "password") {
        pwFieldLog.type = "text";
        togglePwIconLog.innerHTML = feather.icons['eye-off'].toSvg();
    }
    else {
        pwFieldLog.type = "password";
        togglePwIconLog.innerHTML = feather.icons['eye'].toSvg();
    }
    feather.replace();
})

