import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  width: 200px;
  margin: 1rem auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 2px 12px rgba(52, 152, 219, 0.2);
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #95a5a6;
`;

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' }
];

const GenreDropdown = ({ onGenreSelect }) => {
  return (
    <SelectContainer>
      <Select onChange={(e) => onGenreSelect(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Select>
      <Arrow>▼</Arrow>
    </SelectContainer>
  );
};

export default GenreDropdown;