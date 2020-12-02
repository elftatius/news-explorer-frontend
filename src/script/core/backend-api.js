export default class BackendApi {

  constructor(token) {
    this._token = token;
  }

  get(path) {
    return (
      fetch(`https://elftatius.students.nomoreparties.co/api/${path}`, {
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
      fetch(`https://elftatius.students.nomoreparties.co/api/${path}`, {
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
      fetch(`https://elftatius.students.nomoreparties.co/api/${path}`, {
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
