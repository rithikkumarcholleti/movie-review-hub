// TMDb API Configuration
export const TMDB_CONFIG = {
    API_KEY: import.meta.env.VITE_TMDB_API_KEY,
    ACCESS_TOKEN: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500'
  };
  
  // Validate API credentials are present
  if (!TMDB_CONFIG.API_KEY || !TMDB_CONFIG.ACCESS_TOKEN) {
    console.error('TMDb API credentials are missing! Please check your .env file');
  }