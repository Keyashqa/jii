import { useNavigate } from 'react-router-dom';
import { useToast, Button } from '@chakra-ui/react';

const Logout = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem('token');

    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/login');
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
