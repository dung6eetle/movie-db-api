// API
const API_KEY = '132f3ea57c4e8fc725aef7f0904cdf6c';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=132f3ea57c4e8fc725aef7f0904cdf6c'
const imgUrl = 'https://image.tmdb.org/t/p/w500'
// Selecting from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');
const imgElement = document.querySelector('img');

function movieSection(movies) {
 return movies.map((movie) => {
    if (movie.poster_path) {
        return `<img 
        src=${imgUrl + movie.poster_path} 
        data-movie-id=${movie.id}/>`
    }
 })
}

function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie')
    const movieTemplate = `
            <section class="section">
                ${movieSection(movies)}
            </section>
            <div class="content">
                <p id="content-close">Кликни что бы закрыть</p>
            </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement
}
function renderSearchMovies(data) {
    movieSearchable.innerHTML = ""
    const movies = data.results
          const movieBlock = createMovieContainer(movies)
          movieSearchable.appendChild(movieBlock)
          console.log('data:', data)
}
buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    const newUrl = url + '&query=' + value
    fetch(newUrl) 
      .then(res => res.json())
      .then(renderSearchMovies)
      .catch(error => {
          console.log('error:', error)
      })
    console.log('value:',value);
    inputElement.value = ""
}
document.onclick = function(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
      console.log('clicked img')
      const section = event.target.parentElement; // section
      const content = section.nextElementSibling; // content
      content.classList.add('content-display')
    }
    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display')
    }

}