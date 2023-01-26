import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import styled from 'styled-components';

import useToken from './hooks/useToken';

import bgimage from './assets/images/bg-image.png';
import { UserProvider } from './contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: 0,
  },
  in: {
    opacity: 1,
    rotateY: 360,
  },
  out: {
    opacity: 0,
    rotateY: 0,
  }
};

const pageTransition = {
  type: 'spring',
  ease: 'linear',
  duration: 0.5
}; 


const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
  );
};

function App() {
  return ( 
    <>
      <ToastContainer /> 
      <Container >
        <UserProvider>
          <Router>
            <Routes>
              <Route element={<AnimationLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
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
    </>  
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/signin" />;
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
