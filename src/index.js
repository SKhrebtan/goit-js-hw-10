import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_2jIJfwcZBQTHZg4p85o314KTbd5zRvyg8dxZzmKirNbBbL8mHf7vy0nplnD7JLOE";

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');



fetchBreeds()
  .then(response => {
    renderCatCard(response);
            
    select.addEventListener('change', onSelectInput);
    function onSelectInput(e) {
      const option = select.querySelector(`option[value="${select.value}"]`);
            fetchCatByBreed(select.value)
           .then(t => {
             div.innerHTML = '';
             const img = document.createElement('img');
             const descr = document.createElement('p');
             const name = document.createElement('p');
             descr.textContent = option.getAttribute('descr');
             name.textContent = option.getAttribute('name');
             img.setAttribute("src", `${t[0].url}`);
             img.setAttribute("alt", "Amazing nature");
             img.setAttribute("width", "480px");
             div.appendChild(img);
             div.appendChild(name);
             div.appendChild(descr);
               })
    }
    }
      );
 
function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds/')
  .then(response => { return response.json() })
}

function renderCatCard(response) {
  const markup = response.map((t) => {
        console.log(t);
        return `<option value="${t.id}" descr="${t.description}" name="${t.name}">${t.name}</option>`;
      }).join('');
    select.innerHTML = markup;
}
      
function fetchCatByBreed(value) {
  return    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${select.value}`)
           .then(response => { return response.json() })
}
