import Cookies from 'js-cookie';

import BaseComponent from '../BaseComponent';

import unauthorizedTemplate from './UnauthorizedTemplate.html';
import authorizedTemplate from './AuthorizedTemplate.html';
import authorizedDarkTemplate from './AuthorizedDark.html';

export default class Header extends BaseComponent {
  constructor(api, color = 'light') {
    super();
    this._api = api;
    this._color = color;
  }

  render() {
    const container = document.querySelector('.root');
    const header = container.querySelector('.header');
    if(header) {
      header.remove();
    }
    const session = Cookies.get('session');
    if (session === undefined) {
      this._renderUnauthorized(container);
    }
    else {
      this._renderAuthorized(container);
    }
  }

  _renderUnauthorized(container) {
    const element = this._renderTemplate(unauthorizedTemplate);
    container.prepend(element);
    this._element = element;
  }

  _renderAuthorized(container) {
    const element = this._renderTemplate(this._color === 'dark' ? authorizedDarkTemplate : authorizedTemplate);
    container.prepend(element);
    this._element = element;
    this._api.get('users/me')
      .then(res => {
        document.querySelector('#header-user-name').textContent = res.data.name;
      })
      .catch(err => {
        Cookies.remove("session");
        location.reload();
      })
  }
}
