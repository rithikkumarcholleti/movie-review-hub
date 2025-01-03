import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 600px;
`;

const Title = styled.h3`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #34495e;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  min-height: 150px;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusMessage = styled.p`
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  background: ${props => props.$error ? '#fee2e2' : '#dcfce7'};
  color: ${props => props.$error ? '#dc2626' : '#16a34a'};
`;

const ReviewForm = ({ movieTitle }) => {
  const form = useRef();
  const [status, setStatus] = useState({ message: '', error: false });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_rxl7cvo',
        'template_nv7k7mj',
        form.current,
        'SqkI10KwM5VAYPixM'
      )
      .then(
        (result) => {
          setStatus({ message: 'Review submitted successfully!', error: false });
          form.current.reset();
        },
        (error) => {
          setStatus({
            message: 'Failed to submit review. Please try again.',
            error: true
          });
        }
      );
  };

  return (
    <FormContainer>
      <Title>Submit Your Review</Title>
      <Form ref={form} onSubmit={sendEmail}>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="from_name"
            placeholder="Enter your name"
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="from_email"
            placeholder="Enter your email"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="movie">Movie</Label>
          <Input
            id="movie"
            type="text"
            name="movie_title"
            value={movieTitle}
            readOnly
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="review">Your Review</Label>
          <TextArea
            id="review"
            name="message"
            placeholder="Write your review here..."
            required
          />
        </InputGroup>

        <SubmitButton type="submit">Submit Review</SubmitButton>
        
        {status.message && (
          <StatusMessage $error={status.error}>
            {status.message}
          </StatusMessage>
        )}
      </Form>
    </FormContainer>
  );
};

export default ReviewForm;