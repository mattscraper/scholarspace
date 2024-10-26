import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // For navigation to room group chat
import { RoomChat } from "../roomchat";

export const ViewRooms = ({ userId }) => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/view/${userId}/rooms`
        );

        if (response.data && Array.isArray(response.data.rooms)) {
          setRooms(response.data.rooms);
        } else {
          setRooms([]);
          setError("No rooms found for this user.");
        }
      } catch (error) {
        setError("Failed to fetch rooms. Please try again.");
      }
    };
    fetchRooms();
  }, [userId]);

  // Navigate to the group chat page
  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}/chat`);
  };

  return (
    <Box p={70} bg="gray.100" minH="100vh">
      <Heading as="h1" size="xl" mb={10} textAlign="center">
        Your Rooms
      </Heading>
      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}
      {rooms.length > 0 ? (
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          justifyItems="center"
        >
          {rooms.map((room) => (
            <GridItem
              key={room.id}
              w="100%"
              p={6}
              bg="white"
              boxShadow="xl"
              borderRadius="md"
              transition="transform 0.3s"
              _hover={{ transform: "translateY(-10px)", cursor: "pointer" }}
              onClick={() => handleRoomClick(room.id)}
            >
              <Heading as="h2" size="lg" mb={5}>
                {room.name}
              </Heading>
              <Text fontSize="md" color="gray.600">
                {room.description}
              </Text>
              <Text fontSize="sm" color="gray.600" marginTop={4} padding={2}>
                Room Id: {room.id}
              </Text>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Text textAlign="center" color="gray.500">
          No rooms found
        </Text>
      )}
    </Box>
  );
};
