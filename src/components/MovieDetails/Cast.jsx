import React from 'react';
import styled from 'styled-components';

const CastContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
`;

const Cast = ({ cast }) => {
  return (
    <CastContainer>
      <h2>Cast</h2>
      <p>{cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
    </CastContainer>
  );
};

export default Cast;