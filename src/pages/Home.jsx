import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { getPopularMovies, searchMovies, getMoviesByGenre } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreDropdown from '../components/GenreDropdown';
import Navigation from '../components/Navigation';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 2rem;
    color: #2c3e50;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #3498db;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeGenre, setActiveGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let data;
      
      if (searchQuery) {
        data = await searchMovies(searchQuery, page);
      } else if (activeGenre) {
        data = await getMoviesByGenre(activeGenre, page);
      } else {
        data = await getPopularMovies(page);
      }

      setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies();
  }, [searchQuery, activeGenre]);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveGenre('');
  };

  const handleGenreSelect = (genreId) => {
    setActiveGenre(genreId);
    setSearchQuery('');
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <Navigation />
      <Container>
        <Header>
          <h1>Discover Movies</h1>
          <SearchBar onSearch={handleSearch} />
          <GenreDropdown onGenreSelect={handleGenreSelect} />
        </Header>
        <MovieGrid>
          {movies.map((movie, index) => (
            <div key={`${movie.id}-${index}`} ref={index === movies.length - 1 ? lastMovieElementRef : null}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </MovieGrid>
        {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
      </Container>
    </>
  );
};

export default Home;