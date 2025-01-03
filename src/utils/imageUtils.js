import { TMDB_CONFIG } from '../config/tmdb.config';

export const getImageUrl = (path) => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${path}`;
};