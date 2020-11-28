export default class Card {
  static _template = document.querySelector('#card-template').content;

  constructor({ tag, imageUrl, cardDate, cardTitle, cardDescription, cardSource, externalUrl }) {
    this._tag = tag;
    this._imageUrl = imageUrl;
    this._cardDate = cardDate;
    this._cardTitle = cardTitle;
    this._cardDescription = cardDescription;
    this._cardSource = cardSource;
    this._externalUrl = externalUrl;
  }

  createElement() {
    const element = Card._template.cloneNode(true).children[0];
    element.setAttribute('href', this._externalUrl);
    element.querySelector('.card__tag').textContent = this._tag;
    element.querySelector('.card__image').setAttribute('style', `background-image: url(${this._imageUrl});`);
    element.querySelector('.card__date').textContent =  this._cardDate;
    element.querySelector('.card__title').textContent =  this._cardTitle;
    element.querySelector('.card__description').textContent =  this._cardDescription;
    element.querySelector('.card__source').textContent =  this._cardSource;

    return element;
  }
}