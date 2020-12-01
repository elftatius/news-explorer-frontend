import BaseComponent from './../BaseComponent';

import CardTemplate from './Card.html';

export default class Card extends BaseComponent {

  constructor({ tag, imageUrl, cardDate, cardTitle, cardDescription, cardSource, externalUrl }, api) {
    super();
    this._api = api;
    this._tag = tag;
    this._imageUrl = imageUrl;
    this._cardDate = cardDate;
    this._cardTitle = cardTitle;
    this._cardDescription = cardDescription;
    this._cardSource = cardSource;
    this._externalUrl = externalUrl;
  }

  createElement() {
    const element = this._renderTemplate(CardTemplate);
    element.setAttribute('href', this._externalUrl);
    element.querySelector('.card__tag').textContent = this._tag;
    element.querySelector('.card__image').setAttribute('style', `background-image: url(${this._imageUrl});`);
    element.querySelector('.card__date').textContent =  this._cardDate.toLocaleDateString();
    element.querySelector('.card__title').textContent =  this._cardTitle;
    element.querySelector('.card__description').textContent =  this._cardDescription;
    element.querySelector('.card__source').textContent =  this._cardSource;

    this._configure(element);

    return element;
  }
}