import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"


const Room = ({room, setSelectedRoom}) => {
  
  const navigate = useNavigate()
  
  useEffect(()=> {
    console.log(room);

  }, [])


  // const fetchMessages = async () => {
  //   try{

  //     //!check the fetch 
  //     const response = await fetch(`https://localhost:8080/messages/all`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     })
      
  //     const data = await response.json()

    


  //   }catch (err){
  //     console.log(err);
  //   }
  // }
    
  return (
    <div>
      <h1>{room.name}</h1>

    <button onClick={() => {
      setSelectedRoom(room._id)
      navigate(`/messages/${room._id}`)
      }}>Click here to go to Messages 📨</button>


    </div>
  )
}

export default Room