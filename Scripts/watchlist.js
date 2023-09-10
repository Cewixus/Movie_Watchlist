import { getMoviesObject, watchListArray } from "/Scripts/renderMovies.js"

const watchlist = document.getElementById('watchlist')

getMoviesObject(watchListArray, watchlist)

document.addEventListener("click", function(e){
    if(e.target.name === 'watchlist-button'){
        watchListArray.splice(watchListArray.indexOf(e.target.id), 1)
        localStorage.setItem("movies", JSON.stringify(watchListArray))
        getMoviesObject(watchListArray, watchlist)
        if(watchListArray.length === 0){
            document.getElementById('watchlist').innerHTML = `
            <h3 class="watchlist-text">Your watchlist is looking a little empty...</h3>
            `
        }
    }
})