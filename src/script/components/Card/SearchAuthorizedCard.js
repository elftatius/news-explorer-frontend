import Card from './Card';

export default class SearchAuthorizedCard extends Card {
  _configure(element) {
    element.querySelector('.card__action-tooltip').remove();
  }
}