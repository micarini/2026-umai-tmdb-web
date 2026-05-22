import axios from "axios";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export const tmdbApi = axios.create({
	baseURL: "/api/tmdb",
});

const withTmdbPath = (path) => {
	return path;
};

export const tmdbEndpoints = {
	trendingMovies: withTmdbPath("/trending/movie/day"),
	popularMovies: withTmdbPath("/movie/popular"),
	topRatedMovies: withTmdbPath("/movie/top_rated"),
	nowPlayingMovies: withTmdbPath("/movie/now_playing"),
	upcomingMovies: withTmdbPath("/movie/upcoming"),
	movieDetail: (id) => withTmdbPath(`/movie/${id}`),
	movieVideos: (id) => withTmdbPath(`/movie/${id}/videos`),
	popularTvShows: withTmdbPath("/tv/popular"),
	topRatedTvShows: withTmdbPath("/tv/top_rated"),
	tvShowDetail: (id) => withTmdbPath(`/tv/${id}`),
};

export const getMovieRuntime = async (movieId) => {
	const response = await tmdbApi.get(tmdbEndpoints.movieDetail(movieId));
	return response.data?.runtime || null;
};

export const getTmdbImageUrl = (path) => { 
	if (!path) {
		return null;
	}

	return `${TMDB_IMAGE_BASE_URL}${path}`;
};

export const getTmdbBackdropUrl = (path) => { // esta función toma un path de imagen y devuelve la URL completa para la imagen de fondo, si el path no está definido, devuelve null
	if (!path) {
		return null;
	}

	return `${TMDB_BACKDROP_BASE_URL}${path}`;
};
