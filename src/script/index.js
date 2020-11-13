import '../pages/index.css';

const authBtn = document.querySelector('.header__button');
const closeBtn = document.querySelector('#login-popup-close');
const loginPopup = document.querySelector('#login-popup');

authBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.add('popup_is-opened');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.remove('popup_is-opened');
});
