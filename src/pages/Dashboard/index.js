import { useContext } from 'react';
import styled from 'styled-components';

export default function Dashboard() {
 
  return (
    <>
      <Container>
         Hello, World
      </Container>     
    </>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: #000000;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
