import React from "react";
import { Button, Spacer, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <Flex margin={5} left={0} justifyContent={"center"}>
        <Text fontSize={"20px"} as="b" marginTop={10}>
          ScholarSpace
        </Text>
        <img src="/books.png" width={"80px"} height={"50px"} alt="Book" />
      </Flex>
      <Flex minWidth={"max-content"} gap={5} padding={1} marginBottom={10}>
        <Link to={"/"}>
          <Button>Home</Button>
        </Link>
        {isAuthenticated ? (
          <>
            <Link to={"/viewrooms"}>
              <Button>View Rooms</Button>
            </Link>
            <Link to={"/addroom"}>
              <Button>Add Room</Button>
            </Link>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <Button>Log In</Button>
            </Link>
            <Link to={"/register"}>
              <Button>Register</Button>
            </Link>
          </>
        )}
        <Link to={"/about"}>
          <Button>About</Button>
        </Link>
      </Flex>
    </div>
  );
}

export default Navbar;
