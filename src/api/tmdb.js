import axios from 'axios';
import { TMDB_CONFIG } from '../config/tmdb.config';
import { ENDPOINTS } from './endpoints';

const { API_KEY, ACCESS_TOKEN, BASE_URL } = TMDB_CONFIG;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  },
  params: {
    api_key: API_KEY
  }
});

tmdbApi.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.status_message || error.message;
    console.error('TMDb API Error:', errorMessage);
    throw new Error(errorMessage);
  }
);

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get(ENDPOINTS.POPULAR, {
    params: { page }
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get(ENDPOINTS.SEARCH, {
    params: { query, page }
  });
  return response.data;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await tmdbApi.get(ENDPOINTS.DISCOVER, {
    params: { with_genres: genreId, page }
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`${ENDPOINTS.MOVIE_DETAILS}/${movieId}`, {
    params: { append_to_response: 'credits' }
  });
  return response.data;
};