import { getMoviesObject, watchListArray } from "/Scripts/renderMovies.js"

const moviesList = document.getElementById("movies-list")
const controller = new AbortController();

document.getElementById("form-search").addEventListener("submit", function(e){
        e.preventDefault()
        getResultsFromApi()
})

document.addEventListener("click", function(e){
    if(e.target.name === 'watchlist-button'){
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
    const response = await fetch(`https://www.omdbapi.com/?apikey=60ccceec&s=${searchValue}`,)
    const data = await response.json()
    document.getElementById("search-input").value = ''
    if(await data.Response === 'False'){
        moviesList.innerHTML = `<h2>Unable to find what you're looking for. Please try another search.</h2>`
    }else(
        getIDArray(data)
    )
}

function getIDArray(data){
    let idArray = []
    idArray = data.Search.map(item => item.imdbID)
    getMoviesObject(idArray, moviesList)
}

