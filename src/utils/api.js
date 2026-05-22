import axios from "axios";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApi = axios.create({
	baseURL: TMDB_BASE_URL,
});

const withApiKey = (path) => {
	const apiKeyQuery = TMDB_API_KEY ? `api_key=${TMDB_API_KEY}` : "api_key=";

	return `${path}${path.includes("?") ? "&" : "?"}${apiKeyQuery}`;
};

export const tmdbEndpoints = {
	trendingMovies: withApiKey("/trending/movie/day"),
	popularMovies: withApiKey("/movie/popular"),
	topRatedMovies: withApiKey("/movie/top_rated"),
	nowPlayingMovies: withApiKey("/movie/now_playing"),
	upcomingMovies: withApiKey("/movie/upcoming"),
	movieDetail: (id) => withApiKey(`/movie/${id}`),
	popularTvShows: withApiKey("/tv/popular"),
	topRatedTvShows: withApiKey("/tv/top_rated"),
	tvShowDetail: (id) => withApiKey(`/tv/${id}`),
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
