import axios from "axios";
import { TMDB_BASE_URL } from "./api";

const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

const withApiKey = (path) => {
  const apiKeyQuery = TMDB_API_KEY ? `api_key=${TMDB_API_KEY}` : "api_key=";
  return `${TMDB_BASE_URL}${path}${path.includes("?") ? "&" : "?"}${apiKeyQuery}`;
};

const tmdbGet = async (path) => {
  const url = withApiKey(path);
  const response = await axios.get(url);
  return response.data;
};

export const getServerMovieDetail = (movieId) => tmdbGet(`/movie/${movieId}`);
export const getServerMovieVideos = (movieId) => tmdbGet(`/movie/${movieId}/videos`);
