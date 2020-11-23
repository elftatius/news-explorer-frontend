import Cookies from 'js-cookie';

import '../pages/my-profile.css';

import Header from './components/Header';

const session = Cookies.get('session');

if (session === undefined) {
  window.location.replace("/");
}
else {
  const header = new Header();
  header.render();
}
