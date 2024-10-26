import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  Alert,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/register",
        userData
      );
      if (response.status === 200) {
        setMessage("User created successfully");

        const { userId } = response.data;
        login(userId);
        window.location.href = "/viewrooms";
      }
    } catch (error) {
      setMessage(
        `Error creating user: ${error.response?.data?.error || error.message}`
      );
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, teal.300, teal.500)"
      padding={10}
      borderRadius={10}
    >
      <Box
        width="400px"
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        padding={10}
      >
        <Heading as="h2" size="lg" textAlign="center" marginBottom={4}>
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" marginTop={4}>
              Register
            </Button>
          </Stack>
        </form>
        {message && (
          <Alert
            status={message.includes("successfully") ? "success" : "error"}
            marginTop={4}
            borderRadius="md"
          >
            {message}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
