import Card from './Card';
import bookmarkedIcon from '../../../images/bookmarked-icon.svg';

export default class SearchAuthorizedCard extends Card {
  _configure(element) {
    element.querySelector('.card__action-tooltip').remove();
    element.querySelector('.card__icon').addEventListener('click', (e) => {
      e.preventDefault();
      const body = {
        keyword: this._tag,
        title: this._cardTitle,
        text: this._cardDescription,
        date: this._cardDate,
        source: this._cardSource,
        link: this._externalUrl,
        image: this._imageUrl
      }

      this._api.post('articles', body)
      .then((res) => {
        element.querySelector('.card__icon').classList.add('card__icon_active');
        element.querySelector('.card__icon img').setAttribute('src', bookmarkedIcon);
      })
      .catch(err => {
        console.log(err);
      })
    });
  }
}