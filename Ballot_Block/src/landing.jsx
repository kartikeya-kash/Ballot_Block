import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #1a1a2e;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #0779e4;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #065fbb;
  }
`;

const FeaturesSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  text-align: center;
  width: 20%;
`;

const HowItWorksSection = styled.section`
  margin: 2rem 0;
`;

export default function App() {
  return (
    <Container>
      <Title>BallotBlock</Title>
      <Subtitle>
        Verify by Face. Authenticate by OTP. Vote only once. Immutable. Transparent.
      </Subtitle>
      <Button>Start Voting</Button>
      <Button>View Docs</Button>
      <Button>Watch Demo</Button>

      <h2>Features</h2>
      <FeaturesSection>
        <FeatureCard>
          <h3>OTP Verification</h3>
        </FeatureCard>
        <FeatureCard>
          <h3>Immutable Ledger</h3>
        </FeatureCard>
        <FeatureCard>
          <h3>Fast Ledger Dates</h3>
        </FeatureCard>
        <FeatureCard>
          <h3>Public Tracking</h3>
        </FeatureCard>
      </FeaturesSection>

      <HowItWorksSection>
        <h2>How It Works</h2>
        <p>1. Register with Phone</p>
        <p>2. Scan Face via Webcam</p>
        <p>3. View Immutable Result</p>
        <Button>Launch Voting App</Button>
        <Button>Github Repo</Button>
      </HowItWorksSection>

      <footer style={{ marginTop: '2rem' }}>
        <p>2025 BallotBlock | Vite | Nodes | MySQL | Express | Firebase</p>
      </footer>
    </Container>
  );
}
