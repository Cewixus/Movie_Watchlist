let watchListArray = []
let watchlistArrayInLocalStorage = JSON.parse(localStorage.getItem("movies"))
if(watchlistArrayInLocalStorage){
    watchListArray.push(...watchlistArrayInLocalStorage)
    getMoviesObject(watchListArray)
}

document.addEventListener("click", function(e){
    if(e.target.name === 'remove-watchlist'){
        watchListArray.splice(watchListArray.indexOf(e.target.id), 1)
        localStorage.setItem("movies", JSON.stringify(watchListArray))
        getMoviesObject(watchListArray)
        if(!watchListArray){
            document.getElementById('watchlist').innerHTML = `
            <h3 class="watchlist-text">Your watchlist is looking a little empty...</h3>
            `
        }
    }
})

async function getMoviesObject(idArray){
    let movies = []

    for(let id of idArray){
        const response = await fetch(`https://www.omdbapi.com/?apikey=60ccceec&i=${id}`)
        const data = await response.json()
        data.Type === 'movie' && data.Poster !== 'N/A' && movies.push(await data)
    }
    renderMovies(movies)
}

function renderMovies(movies){
    let html = ''
    for(let movie of movies){
        html += `
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
                        <button id="${movie.imdbID}" name="remove-watchlist">- remove</button>
                    </div>
                    <p class="description">${movie.Plot}</p>
                </div>
            </div>
            <hr>
        `
    }
    document.getElementById('watchlist').innerHTML = html
}