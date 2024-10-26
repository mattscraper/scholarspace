import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Flex,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const socket = io("http://localhost:5000");

export const RoomChat = () => {
  const { roomId } = useParams(); // Get roomId from the route params
  const { userId, username } = useAuth(); // Get both userId and username from your AuthProvider
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (userId && roomId && username) {
      socket.emit("join", { username, room: roomId });

      axios
        .get(`http://localhost:5000/api/rooms/${roomId}/messages`)
        .then((response) => {
          console.log("fetched messages:", response.data);
          setChatLog(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });

      socket.on("message", (data) => {
        setChatLog((prevLog) => [...prevLog, data]); // Append new message to chat log
      });

      // Cleanup on unmount (leave room)
      return () => {
        socket.emit("leave", { username, room: roomId });
        socket.off();
      };
    }
  }, [roomId, userId, username]);

  // Function to send a message
  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { room: roomId, username, msg: message };
      socket.emit("message", msgData);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <Box
      width="165vh"
      height="100vh"
      display="flex"
      flexDirection="column"
      bg="gray.50"
    >
      <Heading
        size="lg"
        mb={4}
        textAlign="center"
        p={4}
        bg="teal.500"
        color="white"
      >
        Chat Room
      </Heading>
      <Box flex="1" overflowY="auto" p={4} px={6}>
        <VStack spacing={4} align="stretch">
          {chatLog.map((log, index) => (
            <Flex
              key={index}
              alignSelf={log.username === username ? "flex-end" : "flex-start"}
            >
              <Avatar name={log.username} size="sm" mr={2} />
              <Box
                p={3}
                borderRadius="md"
                bg={log.username === username ? "teal.100" : "gray.200"}
                color={log.username === username ? "teal.800" : "gray.800"}
                maxW="75%"
                wordBreak="break-word"
                boxShadow="md"
              >
                <Text fontWeight="bold">{log.username}</Text>
                <Text>{log.msg}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>
      <HStack mt={4} p={4} spacing={2} bg="white" boxShadow="md">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          variant="outline"
          size="lg"
          borderColor="gray.300"
          _hover={{ borderColor: "teal.400" }}
          _focus={{ borderColor: "teal.500", boxShadow: "md" }}
          borderRadius="md"
        />
        <Button onClick={sendMessage} colorScheme="teal" size="lg">
          Send
        </Button>
      </HStack>
    </Box>
  );
};
