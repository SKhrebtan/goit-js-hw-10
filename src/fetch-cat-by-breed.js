export const fetchCatByBreed = function(id) {
  return    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
           .then(response => { return response.json() })
}