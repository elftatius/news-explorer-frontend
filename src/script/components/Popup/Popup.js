import BaseComponent from './../BaseComponent';

import PopupTemplate from './PopupTemplate.html';

export default class Popup extends BaseComponent {

  render() {
    const container = document.querySelector(".root");
    const element = this._renderTemplate(PopupTemplate);
    container.appendChild(element);
    this._element = element;

    this._addEventListeners();
  }

  setContent(content) {
    const container = this._element.querySelector('.popup__content');
    Array.from(content).forEach(child => {
      container.appendChild(child);
    })
  }

  open() {
    this._element.classList.add('popup_is-opened');
  }

  close() {
    this._element.classList.remove('popup_is-opened');
  }

  _addEventListeners() {
    this._element.addEventListener('click', (e) => {
      e.preventDefault();
      const { classList } = e.target;
      if (classList.contains("popup") || classList.contains("popup__close")) {
        this.close();
      }
    })
  }
}