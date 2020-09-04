// API
const API_KEY = '132f3ea57c4e8fc725aef7f0904cdf6c';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=132f3ea57c4e8fc725aef7f0904cdf6c'
const imgUrl = 'https://image.tmdb.org/t/p/w500'

// Selecting from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');
const imgElement = document.querySelector('img');

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=132f3ea57c4e8fc725aef7f0904cdf6c`
    return url
}

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
    const path = '/search/movie'
    const newUrl = generateUrl(path) + '&query=' + value
    fetch(newUrl) 
      .then(res => res.json())
      .then(renderSearchMovies)
      .catch(error => {
          console.log('error:', error)
      })
    console.log('value:',value);
    inputElement.value = ""
}

function createIframe(video) {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${video.key}`
    iframe.width = 500;
    iframe.height = 365;
    iframe.allowFullscreen = true;
    return iframe;
}

function createVideoTemplate(data, content) {
    content.innerHTML = '<p id="content-close">☓</p>'
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');
    for (let i = 0; i < length; i++) {
       const video = videos[i];
       const iframe = createIframe(video);
       iframeContainer.appendChild(iframe);
       content.appendChild(iframeContainer)
    }
    console.log('videos', data)
}

document.onclick = function(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
      console.log('clicked img');
      console.log('Event:', event) // путь target.dataset.movieId
      const movieId = target.dataset.movieId;
      console.log('movieId', movieId)
      const section = event.target.parentElement; // section
      const content = section.nextElementSibling; // content
      content.classList.add('content-display')
      const path = `/movie/${movieId}videos`
      const url = generateUrl(path)
       // fetch movie videos
      fetch(url)
        .then(res => res.json())
        .then((data) => createVideoTemplate(data, content))
        .catch(error => {
            console.log('error:', error)
        })
    }
    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display')
    }
    
}