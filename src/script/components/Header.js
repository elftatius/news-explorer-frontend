import Cookies from 'js-cookie';

export default class Header {
  static _unauthorizedTemplate = document.querySelector('#header-unauthorized-template');
  static _authorizedTemplate = document.querySelector('#header-authorized-template');

  render() {
    const session = Cookies.get('session');
    if (session === undefined) {
      this._renderUnauthorized();
    }
    else {
      this._renderAuthorized();
    }
  }

  _renderUnauthorized() {
    const element = Header._unauthorizedTemplate.content.cloneNode(true).children[0];
    const container = document.querySelector('.root');
    container.prepend(element);
  }

  _renderAuthorized() {
    const element = Header._authorizedTemplate.content.cloneNode(true).children[0];
    const container = document.querySelector('.root');
    container.prepend(element);
  }
}
