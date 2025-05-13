import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  IconButton,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // For managing login status
  const toast = useToast();

  const fetchGoals = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false); // Set to false if no token is found
      return;
    }
    try {
      const res = await axios.get(`/api/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGoals(res.data);
    } catch (error) {
      toast({
        title: 'Failed to fetch goals',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    const token = localStorage.getItem('token');
    if (!newGoal || !token) {
      toast({
        title: 'Please enter a goal or login again',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    try {
      const res = await axios.post(
        `/api/goals`,
        { text: newGoal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGoals([...goals, res.data]);
      setNewGoal('');
    } catch (error) {
      toast({
        title: 'Error adding goal',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`/api/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      toast({
        title: 'Error deleting goal',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    if (!editingText || !token) return;

    try {
      const res = await axios.put(
        `/api/goals/${id}`,
        { text: editingText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGoals(goals.map((goal) => (goal._id === id ? res.data : goal)));
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      toast({
        title: 'Error updating goal',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <Box p={8} maxW="600px" mx="auto">
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle mr={2}>You're not logged in!</AlertTitle>
          <AlertDescription>
            Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to access your goals.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Text fontSize="2xl" mb={4} fontWeight="bold" color="teal.500">
        Your Goals
      </Text>

      <HStack mb={6}>
        <Input
          placeholder="Enter new goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddGoal}>
          Add
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        {goals.map((goal) => (
          <HStack
            key={goal._id}
            justify="space-between"
            border="1px solid #ddd"
            borderRadius="md"
            p={3}
          >
            {editingId === goal._id ? (
              <>
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <IconButton
                  icon={<CheckIcon />}
                  colorScheme="green"
                  onClick={() => handleUpdate(goal._id)}
                />
              </>
            ) : (
              <>
                <Text>{goal.text}</Text>
                <HStack>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => {
                      setEditingId(goal._id);
                      setEditingText(goal.text);
                    }}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(goal._id)}
                  />
                </HStack>
              </>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Dashboard;
