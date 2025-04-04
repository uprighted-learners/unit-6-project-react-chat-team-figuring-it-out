import React from 'react'
import { useState } from 'react'
// import Room from './'
import { useEffect } from 'react'

const Rooms = () => {
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

      setRooms(data.Results);

    };
    
  return <div>
    <p>Hello from Rooms</p>
    {/* {rooms.map((room) => <>Room component</> )} */}
    
    </div>
  
}

export default Rooms