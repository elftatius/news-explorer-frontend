export default class NewsApi {
  constructor(token) {
    this._token = token;
  }

  getNews(q, articlesPerPage, page) {
    return (fetch(`http://newsapi.org/v2/everything?apiKey=${this._token}&pageSize=${articlesPerPage}&page=${page}&q=${q}`)
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
