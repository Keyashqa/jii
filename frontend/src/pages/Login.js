import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Link,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add state for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example request, you can replace with your actual API request
      const response = await axios.post(`/api/users/login`, {
        email,
        password,
      });

       const token = response.data.token;
       localStorage.setItem('token', token); // Store token in localStorage

      navigate('/dashboard'); 


    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.50">
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        width={{ base: '90%', md: '400px' }}
      >
        <Heading mb={6} textAlign="center" color="teal.500">
          Login
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full">
              Login
            </Button>
          </Stack>
        </form>

        {error && (
          <Text mt={4} color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        <Text mt={4} textAlign="center">
          Don't have an account?{' '}
          <Link as={RouterLink} to="/register" color="teal.500" fontWeight="bold">
            Register
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
