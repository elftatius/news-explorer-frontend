export default class Search {
  static _ARTICLES_PER_PAGE = 3;

  static _cardsContainerTemplate = document.querySelector('#cards-container-template').content;
  static _showMoreButtonTemplate = document.querySelector('#show-more-button-template').content;
  static _preloaderTemplate = document.querySelector('#search-preloader').content;
  static _noResultsTemplate = document.querySelector('#no-results-template').content;

  constructor(api, searchForm, newsContainer, createCard) {
    this._searchForm = searchForm;
    this._newsApi = api;
    this._newsContainer = newsContainer;
    this._createCard = createCard;

    this.showPreloader = this.showPreloader.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this._searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = e.target.elements['news-search-query'].value;
      this._newsContainer.innerHTML = '';
      this.performSearch(q, 1);
    });
  }

  performSearch(q, page) {
    this.showPreloader();

    this._newsApi.getNews(q, Search._ARTICLES_PER_PAGE, page)
      .then((data) => {
        this._newsContainer.querySelector('.notification').remove();
        if(data.articles.length > 0) {
          this.showResults(data.articles, q, data.totalResults, page);
        }
        else {
          this.showEmpty();
        }
      })
      .catch((err) => console.log(err));
  }

  showPreloader() {
    const element = Search._preloaderTemplate.cloneNode(true).children[0];
    this._newsContainer.appendChild(element);
  }

  showEmpty() {
    const element = Search._noResultsTemplate.cloneNode(true).children[0];
    this._newsContainer.appendChild(element);
  }

  showResults(articles, q, totalResults, page) {
    const element = Search._cardsContainerTemplate.cloneNode(true).children[0];
    const showMoreButtonTemplate = Search._showMoreButtonTemplate.cloneNode(true).children[0];

    if(!this._newsContainer.querySelector('.section__title')) {
      this._newsContainer.appendChild(element);
    }

    const container = this._newsContainer.querySelector('.cards');

    articles.forEach(article => {
      const card = this._createCard({
        tag: q,
        imageUrl: article.urlToImage,
        cardDate: new Date(article.publishedAt),
        cardTitle: article.title,
        cardDescription: article.description,
        cardSource: article.source.name,
        externalUrl: article.url
      });

      container.appendChild(card.createElement());
    });

    if(page * Search._ARTICLES_PER_PAGE < totalResults) {
      this._newsContainer.appendChild(showMoreButtonTemplate);
      const button = this._newsContainer.querySelector('#show-more-news');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        button.closest('div').remove();
        this.performSearch(q, page + 1);
      });
    }
  }
}
