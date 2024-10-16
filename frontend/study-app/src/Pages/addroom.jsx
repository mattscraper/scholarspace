import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
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
} from "@chakra-ui/react";

export function AddRoom() {
  const { userId } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        onClose();
      }
    } catch (error) {
      setMessage(
        `Error creating room: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <>
      <Button onClick={onOpen} className="addbutton">
        Add Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
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
    </>
  );
}
