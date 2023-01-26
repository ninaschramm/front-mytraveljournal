import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import styled from 'styled-components';

import useToken from './hooks/useToken';

import bgimage from './assets/images/bg-image.png';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (  
    <Container >
      <UserProvider>
        <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRouteGuard>
                    <Dashboard />
                  </ProtectedRouteGuard>
                }
              ></Route>
          </Routes>
        </Router>
      </UserProvider>      
    </Container>      
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>
    {children}
  </>;
}

export default App;

const Container = styled.div`
  padding: 30px;
  height: 100vh;
  width: 100%;
  background: url(${bgimage});
  background-size: cover; 
  display: flex;
  justify-content: center;
`;
