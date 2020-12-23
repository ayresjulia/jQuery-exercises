let currentId = 0;
let moviesList = [];

$(function () {
	$('#new-movie-form').on('submit', function (evt) {
		evt.preventDefault();
		let title = $('#title').val();
		let rating = $('#rating').val();

		let movieData = { title, rating, currentId };
		const HTMLtoAppend = createMovieDataHTML(movieData);

		currentId++;
		moviesList.push(movieData);

		$('#movie-table-body').append(HTMLtoAppend);
		$('#new-movie-form').trigger('reset');
	});

	$('tbody').on('click', '.btn.btn-danger', function (evt) {
		// find the index where this movie is
		let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data('deleteId'));

		// remove it from the array of movies
		moviesList.splice(indexToRemoveAt, 1);

		// remove it from the DOM
		$(evt.target).closest('tr').remove();
	});

	$('.fas').on('click', function (evt) {
		// figure out what direction we are sorting and the key to sort by
		let direction = $(evt.target).hasClass('fa-sort-down') ? 'down' : 'up';
		let keyToSortBy = $(evt.target).attr('id');
		let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

		// empty the table
		$('#movie-table-body').empty();

		// loop over our object of sortedMovies and append a new row
		for (let movie of sortedMovies) {
			const HTMLtoAppend = createMovieDataHTML(movie);
			$('#movie-table-body').append(HTMLtoAppend);
		}

		// toggle the arrow
		$(evt.target).toggleClass('fa-sort-down');
		$(evt.target).toggleClass('fa-sort-up');
	});
});

function sortBy(array, keyToSortBy, direction) {
	return array.sort(function (a, b) {
		// since rating is a number, we have to convert these strings to numbers
		if (keyToSortBy === 'rating') {
			a[keyToSortBy] = +a[keyToSortBy];
			b[keyToSortBy] = +b[keyToSortBy];
		}
		if (a[keyToSortBy] > b[keyToSortBy]) {
			return direction === 'up' ? 1 : -1;
		} else if (b[keyToSortBy] > a[keyToSortBy]) {
			return direction === 'up' ? -1 : 1;
		}
		return 0;
	});
}

function createMovieDataHTML(data) {
	return `
	  <tr>
		<td>${data.title}</td>
		<td>${data.rating}</td>
		<td>
		  <button class="btn btn-danger" data-delete-id=${data.currentId}>
			Delete
		  </button>
		</td>
	  <tr>
	`;
}
