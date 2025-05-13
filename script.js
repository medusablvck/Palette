'use script'

const loginBtn = document.querySelector('.login');
const registrationForm = document.querySelector('.form__registr');
const closeButton = document.querySelector('.form__close-button');
const form = document.forms.form;
const userNameInput = form.elements.userName;
const emailInput = form.elements.email;
const passwordInput = form.elements.password;
const phonedInput = form.elements.phone;
const errorName = document.querySelector('.error__name');
const errorEmail = document.querySelector('.error__email');
const errorPassword = document.querySelector('.error__password');
const errorPhone = document.querySelector('.error__phone');
const checkboxInput = form.elements.checkbox;
const buttonInput = form.elements.button;
const formRegistr = document.querySelector('.modal__footer-registration');
const email2Input = document.getElementById('email2');
const errorEmail2 = document.querySelector('.error__email2');
const emailSubmit = document.querySelector('.email-submit');
const imageItem = document.querySelectorAll('.image-grid__item');
const headerBtn = document.querySelector('.burger');
const headerNav = document.querySelector('.header__navigation');


loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    registrationForm.classList.add('active');
});

// Обработчик для крестика
closeButton.addEventListener('click', function (e) {
    e.preventDefault();
    registrationForm.classList.remove('active');
});
// Обработчик для закрытия формы при клике вне её
document.addEventListener('click', function (e) {
    if (!registrationForm.contains(e.target) &&
        e.target !== loginBtn &&
        !loginBtn.contains(e.target)) {
        registrationForm.classList.remove('active');
    }
});

// Паттерны для проверки формы
form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    errorPhone.textContent = '';

    let isValid = true;

    const userName = userNameInput.value;
    if (userName.trim() === '') {
        errorName.textContent = 'Error: Please enter your name!';
        isValid = false;
    }

    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorEmail.textContent = 'Error: Enter Email!';
        isValid = false;
    }

    const password = passwordInput.value;
    if (password.trim() === '') {
        errorPassword.textContent = 'Error: enter password!';
        isValid = false;
    } else {
        const passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passPattern.test(password)) {
            errorPassword.textContent = 'Error: Please enter a strong password!';
            isValid = true;
        }
    }

    const phone = phonedInput.value;
    if (phone.trim() === '') {
        errorPhone.textContent = 'Error: Please enter your phone number'
        isValid = false;
    }

    if (!checkboxInput.checked) {
        alert('Error: consent to the processing of personal data is required!');
        isValid = false;
    }

    if (isValid) {
        alert('You have registered successfully!');
        form.reset();
    } else (
        console.log('The form has not been validated.')
    )
})

// Чекбокс
checkboxInput.addEventListener('click', function () {
    if (checkboxInput.checked === true) {
        buttonInput.disabled = false;
    } else {
        buttonInput.disabled = true;
    }
});

// Кнопка для открытия доп цветов
document.querySelector('.btn-color').addEventListener('click', function () {
    const hiddenColors = document.querySelector('.hidden-colors');
    const button = this;

    hiddenColors.classList.toggle('show');
    if (hiddenColors.classList.contains('show')) {
        button.textContent = 'Hide colors';
    } else {
        button.textContent = 'Shop all colors';
    }
});


// Проверка для отправки имейла #2
formRegistr.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = email2Input.value.trim();

    if (!email) {
        errorEmail2.textContent = 'Email is required';
        errorEmail2.style.color = 'red';
        errorEmail2.style.fontSize = '1.2rem';
        return;
    }

    if (validateEmail(email)) {
        console.log('Email valid:', email);
        errorEmail2.textContent = 'Sent!';
        errorEmail2.style.color = 'green';
        errorEmail2.style.fontSize = '1.2rem';

        setTimeout(() => {
            email2Input.value = '';
            errorEmail2.textContent = '';
        }, 1000);
    } else {
        errorEmail2.textContent = 'Please enter a valid email';
        errorEmail2.style.color = 'red';
    }
});
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Смена языка, но только на кнопке 
document.addEventListener('DOMContentLoaded', function () {
    const langSelector = document.querySelector('.language-selector');
    const langCurrent = langSelector.querySelector('.language-current span');
    const langOptions = langSelector.querySelectorAll('.language-dropdown a');

    langOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            langCurrent.textContent = lang.toUpperCase();

            console.log('Selected language:', lang);

            // Закрываем dropdown после выбора
            langSelector.blur();
        });
    });
});


// Работа бургер кнопки

headerBtn.addEventListener('click', () => {
    headerBtn.classList.toggle('open');
    headerNav.classList.toggle('active');
})


const showBlocks = () => {
    imageItem.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            item.style.transitionDelay = `${index * 1 } s`
            item.classList.add('visible')
        }
    })
}
window.addEventListener('scroll', showBlocks)