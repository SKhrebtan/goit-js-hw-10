import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_2jIJfwcZBQTHZg4p85o314KTbd5zRvyg8dxZzmKirNbBbL8mHf7vy0nplnD7JLOE";

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
fetch('https://api.thecatapi.com/v1/breeds/')
    .then(response => { return response.json() })
    .then(function fetchBreeds(response) {
                return response.map((t) => {
                // console.log(t.description)
              return `<option value="${t.id}">${t.name}</option>`;              
                }).join('')
    })
  .then(up => select.innerHTML = up)
  .then(cat => {
    console.log(cat);
    select.addEventListener('change', onSelectInput);
    function onSelectInput(e) {
      console.log(cat)
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${select.value}`)
        .then(response => { return response.json() }).
        then(t => {
          div.innerHTML = '';
          console.log(t[0]);
           const img = document.createElement('img');
  img.setAttribute("src", `${t[0].url}`);
          img.setAttribute("alt", "Amazing nature");
          img.setAttribute("width", "480px");
                   div.appendChild(img);
        })
    }
  })

