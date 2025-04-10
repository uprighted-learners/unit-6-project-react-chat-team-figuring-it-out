import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"


const Room = ({room, setSelectedRoom}) => {
  
  const navigate = useNavigate()
  
  useEffect(()=> {
    console.log(room);

  }, [])

    
  return (
    <div>
      <h1>{room.name}</h1>

    <button onClick={() => {
      setSelectedRoom(room)
      navigate(`/messages/${room._id}`)
      }}>Click here to go to Messages 📨</button>


    </div>
  )
}

export default Room