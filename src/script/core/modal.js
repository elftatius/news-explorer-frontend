const popupOpenLinks = document.querySelectorAll('[data-open-popup]');
const popupCloseLinks = document.querySelectorAll('[data-close-popup]');

Array.from(popupOpenLinks).forEach((popupOpenLink) => {
  popupOpenLink.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = document.querySelector(popupOpenLink.dataset.openPopup);
    popup.classList.add('popup_is-opened');
  });
});

Array.from(popupCloseLinks).forEach((popupCloseLink) => {
  popupCloseLink.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = document.querySelector(popupCloseLink.dataset.closePopup);
    popup.classList.remove('popup_is-opened');
  });
});
