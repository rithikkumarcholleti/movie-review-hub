import React from 'react';
import styled from 'styled-components';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  
  .star {
    color: #f1c40f;
    font-size: 1.2rem;
  }
`;

const Rating = ({ rating }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="star" />);
    }

    return stars;
  };

  return (
    <RatingContainer>
      Rating: {rating}/10
      {renderStars(rating)}
    </RatingContainer>
  );
};

export default Rating;