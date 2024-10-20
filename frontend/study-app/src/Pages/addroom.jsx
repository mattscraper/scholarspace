import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./addroom.css";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";

export function AddRoom() {
  const { userId } = useAuth();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isJoinOpen, SetIsJoinOpen] = useState(false);
  const toast = useToast();

  const handleAddOpen = () => {
    setIsAddOpen(true);
    setMessage("");
  };

  const handleJoinOpen = () => {
    SetIsJoinOpen(true);
    setMessage("");
  };

  const handleClose = () => {
    setIsAddOpen(false);
    SetIsJoinOpen(false);
    setId("");
    setName("");
    setDescription("");
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const roomData = {
      name: name,
      description: description,
      userId: userId,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/add/room",
        roomData
      );
      if (response.status === 201) {
        setMessage("Room Added!");
        setName("");
        setDescription("");
        handleClose();
        toast({
          title: "Room Ceated.",
          description: `Your room ${name} has been created`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      setMessage(
        `Error creating room: ${error.response?.data?.error || error.message}`
      );
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();

    const roomData = {
      id: id,
      userId: userId,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/joinroom",
        roomData
      );

      if (response.status === 201) {
        const roomName = response.data.roomName;
        setMessage("Room succesfully added!");
        setId("");
        handleClose();
        toast({
          title: "Joined Room",
          description: `You have joined room:  ${roomName}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      setMessage(
        `Error joining room ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <>
      <Button onClick={handleAddOpen} className="addbutton">
        Add Room
      </Button>
      <Modal isOpen={isAddOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {message && (
              <Alert status="info" mb={4}>
                <AlertIcon />
                {message}
              </Alert>
            )}
            <form onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Room Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button onClick={handleJoinOpen} className="addbutton">
        Join Room
      </Button>
      <Modal isOpen={isJoinOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {message && (
              <Alert status="info" mb={4}>
                <AlertIcon />
                {message}
              </Alert>
            )}
            <form onSubmit={handleJoin}>
              <input
                type="text"
                placeholder="Room Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleJoin}>
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
