import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaFilm, FaVideo } from 'react-icons/fa';

const Nav = styled.nav`
  background: linear-gradient(to right, #2c3e50, #3498db);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const AnimatedIcon = styled(FaVideo)`
  font-size: 1.8rem;
  color: white;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(5deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <LeftSection>
        <HomeButton to="/"><FaHome /></HomeButton>
        <Title>
          <FaFilm />
          Movie Review Hub
        </Title>
      </LeftSection>
      <RightSection>
        <AnimatedIcon />
      </RightSection>
    </Nav>
  );
};

export default Navigation;