import Cookies from 'js-cookie';

import '../pages/index.css';

import Search from './index/search';
import NewsApi from './core/news-api';
import BackendApi from './core/backend-api';
import Form from './core/form';
import errorMessages from './core/error-messages';

import Header from './components/Header';
import SearchCard from './components/Card/SearchCard';
import SearchAuthorizedCard from './components/Card/SearchAuthorizedCard';
import Popup from './components/Popup';

const searchForm = document.querySelector('#news-search');
const newsContainer = document.querySelector('#news-container');
const signInContent = document.querySelector('#signin-form-template').content.cloneNode(true).children;
const signUpContent = document.querySelector('#signup-form-template').content.cloneNode(true).children;
const signUpSuccessContent = document.querySelector('#signup-success-template').content.cloneNode(true).children;

const backendApi = new BackendApi(Cookies.get('session'));

const createCard = (card) => {
  if(Cookies.get('session')) {
    return new SearchAuthorizedCard(card);
  }
  else {
    return new SearchCard(card);
  }
}


const signInPopup = new Popup();
signInPopup.render();
signInPopup.setContent(signInContent);

const signUpPopup = new Popup();
signUpPopup.render();
signUpPopup.setContent(signUpContent);

const signUpSuccessPopup = new Popup();
signUpSuccessPopup.render();
signUpSuccessPopup.setContent(signUpSuccessContent);

signInPopup.onClick('#open-signup', (e) => {
  e.preventDefault();
  signInPopup.close();
  signUpPopup.open();
});

signUpPopup.onClick('#open-signin', (e) => {
  e.preventDefault();
  signUpPopup.close();
  signInPopup.open();
});

signUpSuccessPopup.onClick('#success-to-signin', (e) => {
  e.preventDefault();
  signUpSuccessPopup.close();
  signInPopup.open();
});

const header = new Header(backendApi);
header.render();

header.onClick('#signin-open-popup-button', (e) => {
  e.preventDefault();
  signInPopup.open();
})

header.onClick('#logout-button', (e) => {
  e.preventDefault();
  Cookies.remove('session');
  location.reload();
})

const signInForm = new Form(document.querySelector('#signin-form'), errorMessages, backendApi);
const signUpForm = new Form(document.querySelector('#signup-form'), errorMessages, backendApi);

signUpForm.onSubmit = () => {
  signUpPopup.close();
  signUpSuccessPopup.open();
}

signInForm.onSubmit = (data) => {
  Cookies.set('session', data.token);
  location.reload();
}

const newsApi = new NewsApi('e9b1151f78274ba3afb1de6d491f6079');
const search = new Search(newsApi, searchForm, newsContainer, createCard);



newsApi.onNetworkError = () => {
  document.querySelector('#network-error').classList.add('error_visible');
};
