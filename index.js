const moviesList = document.getElementById("movies-list")
let watchListArray = []
let watchlistArrayInLocalStorage = JSON.parse(localStorage.getItem("movies"))
if(watchlistArrayInLocalStorage){
    watchListArray.push(...watchlistArrayInLocalStorage)
}

document.getElementById("form-search").addEventListener("submit", function(e){
        e.preventDefault()
        getResultsFromApi()
})

document.addEventListener("click", function(e){
    if(e.target.name === 'addToWatchlist'){
        if(watchListArray.find(id => id === e.target.id) === undefined){
            watchListArray.push(e.target.id)
            e.target.textContent = '- remove'
        }else{
            watchListArray.splice(watchListArray.indexOf(e.target.id), 1)
            document.getElementById(e.target.id).innerText = '+ Add to watchlist'
        }
        localStorage.setItem("movies", JSON.stringify(watchListArray))
    }
})


async function getResultsFromApi(){
    let searchValue = document.getElementById("search-input").value
    const response = await fetch(`http://www.omdbapi.com/?apikey=60ccceec&s=${searchValue}`)
    const data = await response.json()
    document.getElementById("search-input").value = ''
    if(await data.Response === 'False'){
        noData()
    }else(
        getIDArray(data)
    )
}

function getIDArray(data){
    let idArray = []
    idArray = data.Search.map(item => item.imdbID)
    getMoviesObject(idArray)
}

async function getMoviesObject(idArray){
    let movies = []

    for(let id of idArray){
        const response = await fetch(`http://www.omdbapi.com/?apikey=60ccceec&i=${id}`)
        const data = await response.json()
        data.Type === 'movie' && data.Poster !== 'N/A' && movies.push(await data)
    }
    renderMovies(movies)
}

function noData(){
    moviesList.innerHTML = `<h2>Unable to find what you're looking for. Please try another search.</h2>`
}

function renderMovies(movies){
    moviesList.innerHTML = ''
    for(let movie of movies){
        moviesList.innerHTML += `
            <div class="flex-row movie-container">
                <img src="${movie.Poster}">
                <div class="flex-column">
                    <div class="flex-row">
                    <h3>${movie.Title}</h3>
                    <p>⭐${movie.imdbRating}</p>
                    </div>
                    <div class="flex-row">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button id="${movie.imdbID}" name="addToWatchlist">+ Add to Watchlist</button>
                    </div>
                    <p class="description">${movie.Plot}</p>
                </div>
            </div>
            <hr>
        `
        if(watchListArray.find(id => id === movie.imdbID) === movie.imdbID){
            document.getElementById(movie.imdbID).innerText = '- remove'
        }
    }
}