export const fetchBreeds = function () {
   return fetch('https://api.thecatapi.com/v1/breeds/')
  .then(response => { return response.json() })
}
