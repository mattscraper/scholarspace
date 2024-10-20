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
} from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Login Successful");
        const { userId } = response.data;
        login(userId);
      }
    } catch (error) {
      const data = error.response
        ? error.response.data
        : {
            error: "An error occurred",
          };
      setMessage(data.error || "Login Failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, teal.300, teal.500)"
      padding={4}
    >
      <Box
        width="400px"
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        padding={6}
      >
        <Heading as="h2" size="lg" textAlign="center" marginBottom={4}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
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
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" marginTop={4}>
              Log In
            </Button>
          </Stack>
        </form>
        {message && (
          <Alert
            status={message === "Login Successful" ? "success" : "error"}
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

export default Login;
