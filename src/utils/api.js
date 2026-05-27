import axios from "axios";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

//uso axios.create para crear una instancia preconfigurada con la baseURL de TMDB, esto me permite usar tmdbApi.get('/endpoint') sin tener que escribir la URL completa cada vez
// (axios.get llama a axios para una unica peticion)
// axios es una libreria que servia para hacer peticiones HTTP (alternativa a fetch). tiene  características adicionales como la capacidad de crear instancias preconfiguradas, manejar automáticamente la transformación de datos JSON, y proporcionar una API más amigable para manejar errores y respuestas. 
export const tmdbApi = axios.create({
	baseURL: TMDB_BASE_URL,
});

// esta función me ayuda a construir las URLs de los endpoints de la API de TMDB, asegurándome de incluir siempre la clave de API en cada solicitud, lo que es necesario para autenticar mis peticiones y obtener los datos correctamente
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
	// incluyo images y credits y videos en el endpoint de detalles para no tener que hacer múltiples llamadas a la API
	movieDetailWithExtras: (id) => withApiKey(`/movie/${id}?append_to_response=images,credits`),
	movieVideos: (id) => withApiKey(`/movie/${id}/videos`),
	searchMovies: (query, page = 1) => withApiKey(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),
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

export const getTmdbBackdropUrl = (path) => {
	if (!path) {
		return null;
	}

	return `${TMDB_BACKDROP_BASE_URL}${path}`;
};
