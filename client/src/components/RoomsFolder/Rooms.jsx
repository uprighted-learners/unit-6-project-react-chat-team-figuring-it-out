import React, { useState, useEffect} from 'react'
import Room from './Room';

const Rooms = ({setSelectedRoom}) => {
    const[rooms, setRooms] = useState([])

    useEffect(() => {
      fetchRooms();
    }, [])


    const fetchRooms = async () => {
      const response = await fetch(`http://localhost:8080/rooms/all`, {
          headers:{
            //Check the token after signup
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      })

      const data = await response.json()
      console.log(data);

      setRooms(data);

    };
    
  return <div>
    <p></p>
    {/* check for the key */}
    {rooms.map((room) => <Room key={room._id} room={room} fetchRooms={fetchRooms} setSelectedRoom={setSelectedRoom}/> )}
    
    </div>
  
}

export default Rooms