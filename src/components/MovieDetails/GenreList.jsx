import React from 'react';
import styled from 'styled-components';

const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const Genre = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
`;

const GenreList = ({ genres }) => {
  return (
    <GenresContainer>
      {genres.map((genre) => (
        <Genre key={genre.id}>
          {genre.name}
        </Genre>
      ))}
    </GenresContainer>
  );
};

export default GenreList;