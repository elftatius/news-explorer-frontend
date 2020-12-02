import Card from './Card';
import trashIcon from '../../../images/trash-icon.svg';

export default class SavedCard extends Card {
  _configure(element) {
    element.querySelector('.card__action-tooltip').remove();
    element.querySelector('.card__icon img').setAttribute('src', trashIcon);
    element.querySelector('.card__icon').addEventListener('click', (e) => {
      e.preventDefault();
      this._api.delete(`articles/${this._id}`)
        .then(() => {
          location.reload();
        })
    });
  }
}