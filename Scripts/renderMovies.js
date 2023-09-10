let watchListArray = []
let watchlistArrayInLocalStorage = JSON.parse(localStorage.getItem("movies"))
if(watchlistArrayInLocalStorage){
    watchListArray.push(...watchlistArrayInLocalStorage)
}

async function getMoviesObject(idArray, page){
    let movies = []
    

    for(let id of idArray){
        const response = await fetch(`https://www.omdbapi.com/?apikey=60ccceec&i=${id}`)
        const data = await response.json()
        data.Type === 'movie' && data.Poster !== 'N/A' && movies.push(await data)
    }
    renderMovies(movies, page)
}

function renderMovies(movies, page){
    page.innerHTML = ''
    for(let movie of movies){
        page.innerHTML += `
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
                        <button id="${movie.imdbID}" name="watchlist-button">+ Add to Watchlist</button>
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

export {getMoviesObject, watchListArray}