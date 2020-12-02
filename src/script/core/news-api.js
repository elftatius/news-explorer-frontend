export default class NewsApi {
  static _endpoint = NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything' : 'https://nomoreparties.co/news/v2/everything';

  constructor(token) {
    this._token = token;
  }

  getNews(q, articlesPerPage, page) {
    return (fetch(`${NewsApi._endpoint}?apiKey=${this._token}&pageSize=${articlesPerPage}&page=${page}&q=${q}`)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      }))

      .catch((err) => {
        console.log(err);
        if (this.onNetworkError) {
          this.onNetworkError();
        }
        return Promise.reject(err);
      });
  }
}
