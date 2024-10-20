import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@chakra-ui/react";

export const ViewRooms = ({ userId }) => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`/api/view/${userId}/rooms`);
        console.log("Response from server:", response.data);
        setRooms(response.data.rooms);
      } catch (error) {
        console.error("Error fetching rooms", error);
        setError("Failed to fetch rooms. Please try again.");
      }
    };
    fetchRooms();
  }, [userId]);

  return (
    <div>
      <h1>Your Rooms</h1>
      {error && <p>{error}</p>}
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      ) : (
        <p>No rooms found</p>
      )}
    </div>
  );
};
