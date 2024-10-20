import React from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      paddingY={5}
      paddingX={5}
      backgroundColor="teal.500"
      boxShadow="md"
      zIndex={1000}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <img src="/books.png" width={"50px"} height={"30px"} alt="Book" />
          <Text fontSize="24px" color="white" fontWeight="bold" marginLeft={2}>
            ScholarSpace
          </Text>
        </Flex>
        <Flex gap={4} alignItems="center">
          {isAuthenticated ? (
            <>
              <Link to="/viewrooms">
                <Button colorScheme="teal" variant="solid">
                  View Rooms
                </Button>
              </Link>
              <Link to="/addroom">
                <Button colorScheme="teal" variant="solid">
                  Add Room
                </Button>
              </Link>
              <Button colorScheme="teal" variant="solid" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button colorScheme="teal" variant="solid">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="teal" variant="solid">
                  Register
                </Button>
              </Link>
            </>
          )}
          <Link to="/about">
            <Button colorScheme="teal" variant="solid">
              About
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
