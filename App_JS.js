// Movie Database
const apiKey = '66e5c8ca'; // Replace with your OMDb API key

async function fetchMovieData(title) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movie = {
                title: data.Title,
                genre: data.Genre,
                year: data.Year,
                description: data.Plot
            };

            return movie;
        } else {
            throw new Error('Movie not found');
        }
    } catch (error) {
        console.error('Error fetching movie data:', error.message);
    }
}

// Function to display movie details
function displayMovieDetails(movie) {
    const detailsContainer = document.getElementById('movieDetails');
    detailsContainer.innerHTML = `
      <h2>${movie.title}</h2>
      <p>Genre: ${movie.genre}</p>
      <p>Year: ${movie.year}</p>
      <p>Description: ${movie.description}</p>
    `;
}
const movieTitles = [
    'Inception',
    'The Shawshank Redemption',
    'The Matrix',
    'Jurassic Park',
    'The Dark Knight',
    'Inglourious Basterds',
    'Forrest Gump',
    'Avatar',
    'The Grand Budapest Hotel',
    'The Social Network',
    'La La Land',
    'Black Panther',
];

// Function to get a random movie title and fetch its data
async function getRandomMovie() {
    try {
        const randomIndex = Math.floor(Math.random() * movieTitles.length);
        const randomMovieTitle = movieTitles[randomIndex];

        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${randomMovieTitle}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const randomMovie = {
                title: data.Title,
                genre: data.Genre,
                year: data.Year,
                description: data.Plot
            };

            return randomMovie;
        } else {
            throw new Error('Movie not found');
        }
    } catch (error) {
        console.error('Error fetching random movie data:', error.message);
        throw error;
    }
}

// Function to recommend a random movie from the API
async function recommendMovie() {
    try {
        const randomMovie = await getRandomMovie();
        displayMovieDetails(randomMovie);
    } catch (error) {
        console.error('Error recommending a movie:', error.message);
    }
}
// Function to search for movies based on a keyword
async function searchMovies() {
    try {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const searchResults = searchInput ? await fetchMovieData(searchInput) : null;

        if (searchResults) {
            displayMovieDetails(searchResults);
        } else {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error searching for movies:', error.message);
    }
}