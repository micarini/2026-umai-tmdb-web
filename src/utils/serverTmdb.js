import axios from "axios";
import { TMDB_BASE_URL } from "./api";

const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.TMDB_V3_API_KEY ||
  process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

const buildRequestConfig = () => {
  if (TMDB_READ_ACCESS_TOKEN) {
    return {
      headers: {
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
    };
  }

  return {};
};

const withAuthUrl = (path) => {
  const apiKeyQuery = TMDB_API_KEY ? `api_key=${TMDB_API_KEY}` : "api_key=";
  return `${TMDB_BASE_URL}${path}${path.includes("?") ? "&" : "?"}${apiKeyQuery}`;
};

const tmdbGet = async (path) => {
  const url = withAuthUrl(path);
  const response = await axios.get(url, buildRequestConfig());
  return response.data;
};

export const getServerMovieDetail = (movieId) => tmdbGet(`/movie/${movieId}`);
export const getServerMovieVideos = (movieId) => tmdbGet(`/movie/${movieId}/videos`);
