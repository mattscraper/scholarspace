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

function About() {
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
            />
            <FeatureItem
              title="Customizable Study Rooms"
              description="Personalize your study rooms to suit your preferences and subjects."
            />
            <FeatureItem
              title="Resource Sharing"
              description="Easily share notes, study guides, and resources with others."
            />
            <FeatureItem
              title="Invite Friends"
              description="Invite classmates and friends to join your study sessions."
            />
          </Stack>
        </Box>

        {/* Team Section */}
        <Box bg="white" p={8} boxShadow="lg" borderRadius="lg" mb={10}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Meet the Team
          </Heading>
          <Flex justify="space-around">
            <TeamMember name="Jane Doe" role="Co-Founder & CEO" />
            <TeamMember name="John Smith" role="Lead Developer" />
            <TeamMember name="Alice Johnson" role="UX/UI Designer" />
          </Flex>
        </Box>

        {/* Testimonials Section */}
        <Box bg="white" p={8} boxShadow="lg" borderRadius="lg" mb={10}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            What Our Users Say
          </Heading>
          <Stack spacing={8} align="center">
            <Testimonial
              quote="ScholarSpace has transformed my studying experience!"
              author="Student A"
            />
            <Testimonial
              quote="Collaborating with classmates has never been easier."
              author="Student B"
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

// Reusable team member component
const TeamMember = ({ name, role }) => (
  <Box textAlign="center">
    <Heading as="h3" size="lg" mb={2}>
      {name}
    </Heading>
    <Text fontSize="md" color="gray.500">
      {role}
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

export default About;
