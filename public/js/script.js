let moviesList = [];
let favouritesList = [];

function getMovies() {
	return fetch('http://localhost:3000/movies').then(response => {
		if (response.ok) {
			return response.json();
		}
		else if (response.status == 404) {
			return Promise.reject(new Error('Invalid URL'))
		}
		else if (response.status == 401) {
			return Promise.reject(new Error('UnAuthorized User...'));
		}
		else {
			return Promise.reject(new Error('Some internal error occured...'));
		}
	}).then(moviesResponse => {
		moviesList = moviesResponse;
		displayMovies(moviesList);
		return moviesResponse;
	}).catch(error => {
		const errorEle = document.getElementById('error');
		//tilt / reverse single quote helps to add dynamic value without need of concatination
		errorEle.innerHTML = `<h2 style='color:red'>${error.message}</h2>`;
		return error;
	})
}

function displayMovies(displayMovies) {
	const ulEle = document.getElementById("moviesList");
	let ulHTMLStr = '';
	displayMovies.forEach(movie => {
		ulHTMLStr += `
		<li> ${movie.id} </li>
		<li> ${movie.title} </li>
		<li> ${movie.posterPath} </li>
		`;
	});
	ulEle.innerHTML = ulHTMLStr;
}

function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(response => {
		if (response.ok) {
			return response.json();
		}
		else if (response.status == 404) {
			return Promise.reject(new Error('Invalid URL'))
		}
		else if (response.status == 401) {
			return Promise.reject(new Error('UnAuthorized User...'));
		}
		else {
			return Promise.reject(new Error('Some internal error occured...'));
		}
	}).then(favouritesResponse => {
		favouritesList = favouritesResponse;
		displayFavourites(favouritesList);
		return favouritesResponse;
	}).catch(error => {
		const errorEle = document.getElementById('error');
		errorEle.innerHTML = `<h2 style='color:red'>${error.message}</h2>`;
		return error;
	})
}

function displayFavourites(favourites) {
	const ulEle = document.getElementById("favouritesList");
	let ulHTMLStr = '';
	favourites.forEach(favourite => {
		ulHTMLStr += `
		<li> ${favourite.id} </li>
		<li> ${favourite.title} </li>
		<li> ${favourite.posterPath} </li>
		`;
	});
	ulEle.innerHTML = ulHTMLStr;
}

function addFavourite(inputid) {
	// Get the movie that needs to be added to favourite from movies list
	// which matches the selected movie
	let selectedMovie = moviesList.find(movie => {
		if (movie.id == inputid) {
			return movie;
		}
	});

	// Check if the selected movie is already added to favourites
	let movieExistsInFav = favouritesList.find(movie => {
		if (movie.id == inputid) {
			return movie;
		}
	});

	// Return if the selected movie is already part of favourites
	if (movieExistsInFav) {
		return Promise.reject(new Error('Movie is already added to favourites'));
	}

	//Fetch POST
	return fetch('http://localhost:3000/favourites', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(selectedMovie)
	}).then(response => {
		if (response.ok) {
			return response.json();
		}
		else if (response.status == 404) {
			return Promise.reject(new Error('Invalid URL'))
		}
		else if (response.status == 401) {
			return Promise.reject(new Error('UnAuthorized User...'));
		}
		else {
			return Promise.reject(new Error('Some internal error occured...'));
		}
	}).then(addedMovie => {
		favouritesList.push(addedMovie);
		displayFavourites(favouritesList);
		return favouritesList;
	}).catch(error => {
		const errorEle = document.getElementById('error');
		errorEle.innerHTML = `<h2 style='color:red'>${error.message}</h2>`;
		return error;
	})
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


