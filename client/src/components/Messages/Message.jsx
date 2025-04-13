import React from 'react'
import "./Messages.css"

//using props from MessageIndex file
const Message = ({ message, fetchMessages }) => {
  // logs the message
  // console.log({ message })

  // Debugging
  // const currentUserId = localStorage.getItem("uid");

  const handleDelete = async (messageid) => {
    console.log(messageid)

    try {
      const response = await fetch(`http://localhost:8080/messages/delete/${messageid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await response.json()
      console.log(data)

      if (data.Deleted) {
        fetchMessages()
      } else {
        throw new Error("Error deleting post")
      }

    } catch (error) {
      console.log(error)
    }

    // Used for debugging
    // console.log("Full message:", message)
    // console.log("User ID in message:", message.user?._id)
    // console.log("Local UID:", localStorage.getItem("uid"))
  }

  return (
    <div className='messages'>
      <h5> {message.user?.firstName} {message.user?.lastName} </h5>
      {/* <h5> {message.user?.firstName} {message.user?.lastName} </h5> */}
      <p> {message.body}
        {/* Allowing user to delete a message if the user ID belongs to the user */}
      </p>
      <h4> {new Date(message.createdAt).toLocaleString()} </h4>

      {/* Allowing user to delete a message if the user ID belongs to the user */}
      {message.user?._id === localStorage.getItem("uid") && (
        <button style={{
          position: "relative",
          top: 0,
          right: 0,
          padding: ".1em",
          borderRadius: "50%",
          fontSize: ".6em",
        }} onClick={() => handleDelete(message._id)}>❌</button>
      )}

    </div>
  )
}

export default Message