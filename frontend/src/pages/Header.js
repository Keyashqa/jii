import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Box, HStack, Button, Heading, useToast } from '@chakra-ui/react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Redirect to dashboard if user is logged in and on a public route
    const isPublicRoute = ['/', '/login', '/register'].includes(location.pathname);
    if (token && isPublicRoute) {
      navigate('/dashboard');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast({
      title: 'Logged out',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  return (
    <Box as="header" p={5} bg="teal.500" color="white">
      <HStack justify="space-between" align="center">
        <Heading size="md">My App</Heading>
        <HStack spacing={4}>
          <Link to="/dashboard">
            <Button variant="link" color="white">Home</Button>
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant="link" color="white">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="link" color="white">Register</Button>
              </Link>
            </>
          ) : (
            <Button variant="link" color="white" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
