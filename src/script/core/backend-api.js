export default class BackendApi {

  signUp(name, email, password) {
    return (
      fetch(`https://elftatius.students.nomoreparties.co/api/signup`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
      .then(res => console.log(res))
  )}
}
