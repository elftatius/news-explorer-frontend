import '../pages/index.css';
import './core/modal';

import Search from './index/search';
import NewsApi from './core/news-api';
import Card from './core/card';

const searchForm = document.querySelector('#news-search');
const newsContainer = document.querySelector('#news-container');

const createCard = (card) => {
  return new Card(card);
}

const newsApi = new NewsApi('e9b1151f78274ba3afb1de6d491f6079');
const search = new Search(newsApi, searchForm, newsContainer, createCard);

newsApi.onNetworkError = () => {
  document.querySelector('#network-error').classList.add('error_visible');
};
