import BaseComponent from '../BaseComponent';

import CardListTemplate from './CardList.html';

export default class CardList extends BaseComponent {
  constructor(createCard) {
    super();
    this._createCard = createCard;
  }

  render(container, articles) {
    const element = this._renderTemplate(CardListTemplate);
    container.appendChild(element);
    this._element = element;
    articles.forEach(article => {
      const card = this._createCard({
        tag: article.keyword,
        cardTitle: article.title,
        cardDescription: article.text,
        cardDate: new Date(article.date),
        cardSource: article.source,
        externalUrl: article.link,
        imageUrl: article.image,
        id: article._id
      });
      this._element.querySelector('.cards').appendChild(card.createElement());
    });
  }
}