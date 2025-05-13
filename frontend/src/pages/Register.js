import React from 'react';
import axios from 'axios';
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
import {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Redirect only from login, register, or root
    const isPublicRoute = ['/', '/login', '/register'].includes(location.pathname);
    if (token && isPublicRoute) {
      navigate('/dashboard');
    }
  }, [location,navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/users/register`, {
        name,   // assuming your backend uses "username" instead of "name"
        email,
        password
      });

      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      // You can show an error message to the user here
    }
    setName('');
    setEmail('');
    setPassword('');
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
          Register
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)}/>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} />
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full">
              Register
            </Button>
          </Stack>
        </form>

        <Text mt={4} textAlign="center">
          Already have an account?{' '}
          <Link as={RouterLink} to="/" color="teal.500" fontWeight="bold">
            Login
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;

