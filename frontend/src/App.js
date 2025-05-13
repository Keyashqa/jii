import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';

function App() {
  return (
        <Box textAlign="center" p={5}>
          <Header />
          <Heading mb={6} color="teal.500">Welcome to the App</Heading>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Box>
  );
}

export default App;



