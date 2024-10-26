import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";
import { FaUsers, FaBookOpen, FaShareAlt } from "react-icons/fa"; // Importing icons from React Icons
import { Link } from "react-router-dom";

function About() {
  return (
    <Box bg="gray.100" minH="100vh" py={10}>
      <Container maxW="container.xl">
        {/* Hero Section */}
        <Box
          bgGradient="linear(to-r, teal.300, teal.500)"
          padding={10}
          color="white"
          py={16}
          textAlign="center"
          borderRadius="lg"
          mb={10}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to ScholarSpace!
          </Heading>
          <Text fontSize="lg" mb={6}>
            Your space for collaboration and learning.
          </Text>
          <Link to="/register">
            <Button colorScheme="teal" size="lg">
              Get Started
            </Button>
          </Link>
        </Box>

        {/* Features Section */}
        <Box bg="white" p={8} boxShadow="lg" borderRadius="lg" mb={10}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Key Features
          </Heading>
          <Stack spacing={8}>
            <FeatureItem
              title="Collaborative Study Rooms"
              description="Connect with peers, share notes, and collaborate in real-time."
              icon={<FaUsers />}
            />
            <FeatureItem
              title="Customizable Study Rooms"
              description="Personalize your study rooms to suit your preferences and subjects."
              icon={<FaBookOpen />}
            />
            <FeatureItem
              title="Resource Sharing"
              description="Easily share notes, study guides, and resources with others."
              icon={<FaShareAlt />}
            />
          </Stack>
        </Box>

        {/* Call to Action Section */}
        <Box
          textAlign="center"
          py={16}
          bgGradient="linear(to-r, teal.300, teal.500)"
          color="white"
          borderRadius="lg"
        >
          <Heading as="h2" size="xl" mb={4}>
            Ready to Join Us?
          </Heading>
          <Text fontSize="lg" mb={6}>
            Sign up today and start collaborating with classmates!
          </Text>
          <Link to="/register">
            <Button colorScheme="teal" size="lg">
              Get Started
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

// Reusable feature component with icon
const FeatureItem = ({ title, description, icon }) => (
  <Box display="flex" alignItems="center">
    <Box marginRight={4}>{icon}</Box>
    <Box>
      <Heading as="h3" size="lg" mb={2}>
        {title}
      </Heading>
      <Text fontSize="md" color="gray.600">
        {description}
      </Text>
    </Box>
  </Box>
);

export default About;
