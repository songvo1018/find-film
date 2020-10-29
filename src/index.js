class GetFilmByTitle {
  constructor () {
    this.key = 'b56e0c80'
    this.defaultValue = 'rocky'
    this.value = document.querySelector('input').value;
    this.requestUrl = `http://www.omdbapi.com/?apikey=${this.key}&t=${this.value !== '' ? this.value : this.defaultValue}`
    this.posterUrl = `http://img.omdbapi.com/?apikey=${this.key}&&t=${this.value }`
    this.poster =  document.querySelector('.poster')
    this.title =  document.querySelector('#title')
    this.actors = document.querySelector('#actors')
    this.director = document.querySelector('#director')
    this.released = document.querySelector('#released')
    this.imdbRating = document.querySelector('#imdbRating')
    this.getCreated = false
  }

  getPoster = ( url ) => {
    const posterDOM = document.querySelector('#img-poster')
    if (posterDOM) {
      posterDOM.remove()
      let img = document.createElement('img');
      img.setAttribute('id', `img-poster`)
      img.setAttribute('src', `${ url }`)
      this.poster.append(img)
    } else {
      let img = document.createElement('img');
      img.setAttribute('id', `img-poster`)
      img.setAttribute('src', `${ url }`)
      this.poster.append(img)
    }
    
  }

  get() {
    fetch(this.requestUrl)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        let data = [
          responseData.Title, 
          responseData.Actors, 
          responseData.Director, 
          responseData.Released, 
          responseData.imdbRating,
          responseData.Poster
        ]
        this.getCreated = true
        this.getPoster(data[5])
        this.dataConversion(data)
      });
    }
    
  dataConversion(args) {
    let data = args
    this.title.innerHTML = data[0]
    this.actors.innerHTML = data[1]
    this.director.innerHTML = data[2]
    this.released.innerHTML = data[3]
    this.imdbRating.innerHTML = data[4]
  }
}

const searchBtn = document.getElementById('search')
 searchBtn.addEventListener('click', () => {
  const film = new GetFilmByTitle(`title`)
  film.get()
})

document.addEventListener('keydown', (event) => {
  if (event.code == 'Enter' ) {
    const film = new GetFilmByTitle()
    film.get()
  }
});