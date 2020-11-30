import Cookies from 'js-cookie';

export default class Header {
  static _unauthorizedTemplate = document.querySelector('#header-unauthorized-template');
  static _authorizedTemplate = document.querySelector('#header-authorized-template');

  constructor(api) {
    this._api = api;
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
    const element = Header._unauthorizedTemplate.content.cloneNode(true).children[0];
    container.prepend(element);
    this._element = element;
  }

  _renderAuthorized(container) {
    const element = Header._authorizedTemplate.content.cloneNode(true).children[0];
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

  onClick(selector, func) {
    const element = this._element.querySelector(selector)
    if (!element) {
      return;
    }
    element.addEventListener('click', func);
  }
}
