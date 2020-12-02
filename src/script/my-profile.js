import Cookies from 'js-cookie';

import '../pages/my-profile.css';

import Header from './components/Header/Header';
import BackendApi from './core/backend-api';
import SavedCard from './components/Card/SavedCard';
import CardList from './components/CardList/CardList';

const session = Cookies.get('session');

const backendApi = new BackendApi(Cookies.get('session'));

const createCard = (card) => {
  return new SavedCard(card, backendApi);
}

if (session === undefined) {
  window.location.replace("/");
}
else {
  renderPage();
}

function renderPage() {
  const header = new Header(backendApi, 'dark');
  header.render();
  header.onClick('#logout-button', (e) => {
    e.preventDefault();
    Cookies.remove('session');
    location.reload();
  })

  let helloMessage = '';
  let summaryMessage = 'По ключевым словам: ';

  backendApi.get('users/me')
    .then(({ data }) => {
      helloMessage = data.name;


      backendApi.get('articles')
        .then(({ data }) => {
          helloMessage += `, у вас ${data.length} сохранённых статей`
          document.querySelector('#hello-message').textContent = helloMessage;

          const keywords = data.map(elem => elem.keyword);

          if (keywords.length > 0) {
            let counts = {};
            keywords.forEach(el => counts[el] = 1  + (counts[el] || 0));

            counts = Object.entries(counts)
              .sort(([,a],[,b]) => b - a)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

            summaryMessage += `<b>${Object.keys(counts)[0]}</b>`;
            document.querySelector('#summary-message').innerHTML = summaryMessage;

            if (Object.keys(counts).length === 1) {
              return;
            }

            summaryMessage += `<b>, ${Object.keys(counts)[1]}</b>`;
            document.querySelector('#summary-message').innerHTML = summaryMessage;

            if (Object.keys(counts).length === 2) {
              return;
            }

            summaryMessage += ` и <b>${Object.entries(counts).length - 2}-м другим</b>`;

            document.querySelector('#summary-message').innerHTML = summaryMessage;
          }
        })
    })

  backendApi.get('articles')
    .then(({ data }) => {
      console.log(data);
      const cardList = new CardList(createCard);
      cardList.render(document.querySelector('#news-container'), data);
    })
}

// Грета, у вас 5 сохранённых статей
// По ключевым словам: <b>Природа, Тайга</b> и <b>2-м другим</b>