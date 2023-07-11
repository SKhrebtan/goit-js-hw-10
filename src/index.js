import axios from "axios";
import { fetchBreeds, fetchCatByBreed} from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common["x-api-key"] = "live_2jIJfwcZBQTHZg4p85o314KTbd5zRvyg8dxZzmKirNbBbL8mHf7vy0nplnD7JLOE";

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const pLoader = document.querySelector('.loader');

onPageLoad();

function onPageLoad() {
select.style.display = 'none';
catInfo.style.display = 'none';
pLoader.style.display = '';
};
 
fetchBreeds()
  .then(response => {
    catInfo.style.display = 'none';
    pLoader.style.display = 'none';
    renderCatCard(response);
     new SlimSelect({
    select: '#selectElement',
     })
    }
).catch((error) => {
  console.log(error);
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
})
  .finally(() => { pLoader.style.display = 'none'; }); 

select.addEventListener('change', onSelectInput);
    function onSelectInput(e) {
      catInfo.style.display = 'none';
      pLoader.style.display = 'block';
      fetchCatByBreed(select.value)
        .then(catCardCreate);
       }

function renderCatCard(response) {
  const markup = response.map((cat) => {
    return `<option value="${cat.id}" descr="${cat.description}" name="${cat.name}" temp="${cat.temperament}">${cat.name}</option>`;
  }).join('');
   select.innerHTML = markup;
   select.style.display = 'flex';
}
    function catCardCreate(cat) {
            
      const catName = cat[0].breeds[0].name;
      const catImg = cat[0].url;
      const catTemperamnet = cat[0].breeds[0].temperament;
      const catDescription = cat[0].breeds[0].description;
     
      catInfo.innerHTML = '';
           
      const markup = `
      <img src="${catImg}" alt="${catName}" width="480">
      <div class="info-wrapper">
      <h1>${catName}</h1>      
      <p class="cat-descr">${catDescription}</p>
      <p><span class="card-span">Temperament: </span>${catTemperamnet}</p>
      </div>`;
      catInfo.innerHTML = markup;
      pLoader.style.display = 'none';
      catInfo.style.display = 'flex';
}


// function catCardCreate(t) {
//   const option = select.querySelector(`option[value="${select.value}"]`);
//   div.innerHTML = '';
//    pLoader.style.display = 'none';
//    div.style.display = 'block';
//             const img = document.createElement('img');
//              const descr = document.createElement('p');
//   const name = document.createElement('h1');
//   const temp = document.createElement('p');
//              descr.textContent = option.getAttribute('descr');
//   name.textContent = option.getAttribute('name');
//   temp.textContent = `Temperament: ${option.getAttribute('temp')}`;
//   descr.style.width = '480px';
//                img.setAttribute("src", `${t[0].url}`);
//              img.setAttribute("alt", "Amazing nature");
//              img.setAttribute("width", "480px");
//              div.appendChild(img);
//              div.appendChild(name);
//   div.appendChild(descr);
//   div.appendChild(temp);}