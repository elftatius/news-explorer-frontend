import '../pages/index.css';

import Search from './index/search';
import NewsApi from './core/news-api';
import BackendApi from './core/backend-api';
import FormValidator from './core/form-validator';
import errorMessages from './core/error-messages';

import Header from './components/Header';
import Card from './components/Card';
import Popup from './components/Popup';

const searchForm = document.querySelector('#news-search');
const newsContainer = document.querySelector('#news-container');
const signInContent = document.querySelector('#signin-form-template').content.cloneNode(true).children;
const signUpContent = document.querySelector('#signup-form-template').content.cloneNode(true).children;

const createCard = (card) => {
  return new Card(card);
}

const signInPopup = new Popup();
signInPopup.render();
signInPopup.setContent(signInContent);

const signUpPopup = new Popup();
signUpPopup.render();
signUpPopup.setContent(signUpContent);

signInPopup.onClick('#open-signup', (e) => {
  e.preventDefault();
  signInPopup.close();
  signUpPopup.open();
});

signUpPopup.onClick('#open-signin', (e) => {
  e.preventDefault();
  signUpPopup.close();
  signInPopup.open();
})

const header = new Header();
header.render();

header.onClick('#signin-open-popup-button', (e) => {
  e.preventDefault();
  signInPopup.open();
})

new FormValidator(document.querySelector('#signin-form'), errorMessages);
new FormValidator(document.querySelector('#signup-form'), errorMessages);


const newsApi = new NewsApi('e9b1151f78274ba3afb1de6d491f6079');
const search = new Search(newsApi, searchForm, newsContainer, createCard);

const backendApi = new BackendApi();

newsApi.onNetworkError = () => {
  document.querySelector('#network-error').classList.add('error_visible');
};
