import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getImageUrl } from '../utils/imageUtils';

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: white;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: contain;
  background: #f5f5f5;
`;

const MovieInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const MovieMeta = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageUrl = getImageUrl(movie.poster_path);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <MovieImage src={imageUrl} alt={movie.title} />
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieMeta>Release: {new Date(movie.release_date).toLocaleDateString()}</MovieMeta>
        <MovieMeta>Rating: {movie.vote_average}/10</MovieMeta>
      </MovieInfo>
    </Card>
  );
};

export default MovieCard;