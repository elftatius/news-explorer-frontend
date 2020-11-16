import '../pages/index.css';

const authBtn = document.querySelector('.header__button');
const closeBtn = document.querySelector('#login-popup-close');
const loginPopup = document.querySelector('#login-popup');
const signUpBtn = document.querySelector('#signup-link');
const signUpPopup = document.querySelector('#signup-popup');
const closeSignupBtn = document.querySelector('#signup-popup-close');
const loginBtn = document.querySelector('#login-link');

authBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.add('popup_is-opened');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.remove('popup_is-opened');
});

signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.remove('popup_is-opened');
  signUpPopup.classList.add('popup_is-opened');
});

closeSignupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signUpPopup.classList.remove('popup_is-opened');
});

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signUpPopup.classList.remove('popup_is-opened');
  loginPopup.classList.add('popup_is-opened');
});
