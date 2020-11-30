import Card from './Card';

export default class SearchCard extends Card {
  _configure(element) {
    element.querySelector('.card__icon').addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    element.querySelector('.card__action-tooltip').addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
  }
}