import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetails } from '../api/tmdb';
import { getImageUrl } from '../utils/imageUtils';
import ReviewForm from '../components/ReviewForm';
import Navigation from '../components/Navigation';
import Rating from '../components/MovieDetails/Rating';
import GenreList from '../components/MovieDetails/GenreList';
import Cast from '../components/MovieDetails/Cast';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;
`;

const MovieHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MoviePoster = styled.img`
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const MovieInfo = styled.div`
  flex: 1;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    line-height: 1.6;
    color: #34495e;
    margin-bottom: 1rem;
  }
`;

const BackButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <>
      <Navigation />
      <Container>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <MovieHeader>
          <MoviePoster
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
          />
          <MovieInfo>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            <Rating rating={movie.vote_average} />
            <GenreList genres={movie.genres} />
            <Cast cast={movie.credits.cast} />
          </MovieInfo>
        </MovieHeader>
        <ReviewForm movieTitle={movie.title} />
      </Container>
    </>
  );
};

export default MovieDetails;