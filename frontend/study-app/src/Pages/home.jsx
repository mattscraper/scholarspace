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
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box bg="gray.100" minH="100vh" py={10}>
      <Container maxW="container.xl">
        {/* Hero Section */}
        <Box
          bg="blue.600"
          color="white"
          py={16}
          textAlign="center"
          borderRadius="lg"
          mb={10}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to ScholarSpace
          </Heading>
          <Text fontSize="lg" mb={6}>
            Your ultimate study companion for collaborative learning.
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
              description="Join or create study rooms with peers to share notes and resources."
            />
            <FeatureItem
              title="Interactive Tools"
              description="Utilize tools for live discussions, Q&A, and sharing materials in real-time."
            />
            <FeatureItem
              title="Resource Library"
              description="Access a library of resources tailored for your classes and subjects."
            />
          </Stack>
        </Box>

        {/* How It Works Section */}
        <Box bg="white" p={8} boxShadow="lg" borderRadius="lg" mb={10}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            How It Works
          </Heading>
          <Stack as="ol" spacing={4}>
            <Text as="li" fontSize="lg">
              Create an account to access all features.
            </Text>
            <Text as="li" fontSize="lg">
              Join or create a study room for your course.
            </Text>
            <Text as="li" fontSize="lg">
              Collaborate with classmates and ace your studies together!
            </Text>
          </Stack>
        </Box>

        {/* Testimonials Section */}
        <Box bg="white" p={8} boxShadow="lg" borderRadius="lg" mb={10}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            What Our Users Say
          </Heading>
          <Stack spacing={8} align="center">
            <Testimonial
              quote="ScholarSpace has transformed the way I study! Collaborating with my peers has never been easier."
              author="Sarah L."
            />
            <Testimonial
              quote="The resource library is a lifesaver for finding study materials!"
              author="James T."
            />
          </Stack>
        </Box>

        {/* Call to Action Section */}
        <Box
          textAlign="center"
          py={16}
          bg="blue.600"
          color="white"
          borderRadius="lg"
        >
          <Heading as="h2" size="xl" mb={4}>
            Ready to Elevate Your Learning?
          </Heading>
          <Link to="/register">
            <Button colorScheme="teal" size="lg">
              Join Now
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

// Reusable feature component
const FeatureItem = ({ title, description }) => (
  <Box>
    <Heading as="h3" size="lg" mb={2}>
      {title}
    </Heading>
    <Text fontSize="md" color="gray.600">
      {description}
    </Text>
  </Box>
);

// Reusable testimonial component
const Testimonial = ({ quote, author }) => (
  <Box textAlign="center" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
    <Text fontSize="lg" fontStyle="italic" mb={4}>
      "{quote}"
    </Text>
    <Text fontWeight="bold" fontSize="md">
      - {author}
    </Text>
  </Box>
);

export default Home;
