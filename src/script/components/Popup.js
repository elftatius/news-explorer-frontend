export default class Popup {
  static _template = document.querySelector('#popup-template');

  render() {
    const container = document.querySelector(".root");
    const element = Popup._template.content.cloneNode(true).children[0];
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

  onClick(selector, func) {
    this._element.querySelector(selector).addEventListener('click', func);
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