import axios from "axios";
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './fetch-cat-by-breed';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'

// new SlimSelect({
//   select: '#selectElement',
// })

axios.defaults.headers.common["x-api-key"] = "live_2jIJfwcZBQTHZg4p85o314KTbd5zRvyg8dxZzmKirNbBbL8mHf7vy0nplnD7JLOE";

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
const pLoader = document.querySelector('.loader');

onPageLoad();

function onPageLoad() {
select.style.display = 'none';
div.style.display = 'none';
pLoader.style.display = 'block';
};
 
fetchBreeds()
  .then(response => {
    div.style.display = 'none';
    pLoader.style.display = 'none';
    renderCatCard(response);
    
    select.addEventListener('change', onSelectInput);
    function onSelectInput(e) {
      div.style.display = 'none';
      pLoader.style.display = 'block';
      fetchCatByBreed(select.value)
        .then(catCardCreate);
       }
    
  }
).catch(() => {Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')})
  .finally(() => { pLoader.style.display = 'none'; }); 



function renderCatCard(response) {
  const markup = response.map((t) => {
        return `<option value="${t.id}" descr="${t.description}" name="${t.name}">${t.name}</option>`;
  }).join('');
  select.style.display = 'block';
    select.innerHTML = markup;
}

function catCardCreate(t) {
  const option = select.querySelector(`option[value="${select.value}"]`);
  div.innerHTML = '';
  pLoader.style.display = 'none';
   div.style.display = 'block';
            const img = document.createElement('img');
             const descr = document.createElement('p');
             const name = document.createElement('h1');
             descr.textContent = option.getAttribute('descr');
  name.textContent = option.getAttribute('name');
  descr.style.width = '480px';
               img.setAttribute("src", `${t[0].url}`);
             img.setAttribute("alt", "Amazing nature");
             img.setAttribute("width", "480px");
             div.appendChild(img);
             div.appendChild(name);
             div.appendChild(descr);
}