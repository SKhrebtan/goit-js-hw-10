import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_2jIJfwcZBQTHZg4p85o314KTbd5zRvyg8dxZzmKirNbBbL8mHf7vy0nplnD7JLOE";

const select = document.querySelector('.breed-select');
console.log(select)
fetch('https://api.thecatapi.com/v1/breeds/')
    .then(response => { return response.json() })
    .then(function Markup(response) {
        let listMarkup
                return listMarkup = response.map((t) => {
                console.log(t.id)
              return `<option value="${t.id}">${t.name}</option>`;              
                        }).join('')}).then(up => select.innerHTML = up  )

// select.innerHTML = listMarkup  
//    function Markup(response) {
//                     const listMarkup = response.map((t) => {
//                 console.log(t.id)
//               return `<option value="${t.id}">${t.name}</option>`;              
//                         }).join('')}
// function Markup(response) {
//                   return response.map((t) => {
//                 console.log(t.id);
//                 `<option value="${t.id}">${t.name}</option>`;
//             })
//                 .join('');
//         },
//         select.insertAdjacentHTML('beforeend', response)
//  fetch(`https://api.thecatapi.com/v1/images/${t.reference_image_id}`).then(img => { return img.json() }).then(t => console.log(t.url));