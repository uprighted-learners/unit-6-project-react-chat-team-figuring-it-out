import React from 'react'
import "./Messages.css"

//using props from MessageIndex file
const Message = ({ message, fetchMessages }) => {
  // logs the message
  console.log({ message })

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

      if (data.Deleted) {
        fetchMessages()
      } else {
        throw new Error("Error deleting post")
      }

    } catch (error) {
      console.log(err)
    }
  }

  return (
    <div>
      <h5> {message.user.firstName} {message.user.lastName} </h5>
      {/* <h5> {message.user?.firstName} {message.user?.lastName} </h5> */}
      <h4> {new Date(message.createdAt).toLocaleString()} </h4>
      <p> {message.body} </p>

      {message.user._id === localStorage.getItem("uid") && (
        <button style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: ".6em",
          borderRadius: "50%",
          fontSize: ".6em",
        }} onClick={() => handleDelete(message._id)}>❌</button>
      )}

    </div>
  )
}

export default Message