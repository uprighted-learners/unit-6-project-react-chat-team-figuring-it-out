import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Rooms.css"


const Room = ({ room, setSelectedRoom, fetchRooms }) => {

  const userId = localStorage.getItem("uid")
  const navigate = useNavigate()

  useEffect(() => {
    console.log(room);

  }, [])

  const handleJoinRoom = async () => {
    try {
      const response = await fetch(`http://localhost:8080/rooms/join/${room._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();
      console.log(data);

      setSelectedRoom(room)
      alert("Joined room successfully!")
      navigate(`/messages/${room._id}`)

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{room.name}</h1>

      {room.addedUsers && room.addedUsers.some(user => user._id === userId) ? (
        <button onClick={() => {
          setSelectedRoom(room)
          localStorage.setItem("selectedRoom", JSON.stringify(room))
          navigate(`/messages/${room._id}`)
        }}>Click here to go to Messages 📬</button>) : (
        <button onClick={handleJoinRoom}>
          Join Room ➕
        </button>
      )}

    </div>
  )
}

export default Room