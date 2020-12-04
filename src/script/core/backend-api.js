export default class BackendApi {
  static _endpoint = 'https://api.elftatius.students.nomoreparties.space';

  constructor(token) {
    this._token = token;
  }

  get(path) {
    return (
      fetch(`${BackendApi._endpoint}/${path}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._token}`
        }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
  )}

  post(path, body) {
    return (
      fetch(`${BackendApi._endpoint}/${path}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._token}`
        },
        body: JSON.stringify(body)
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
  )}

  delete(path) {
    return (
      fetch(`${BackendApi._endpoint}/${path}`, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._token}`
        }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
  )}
}
