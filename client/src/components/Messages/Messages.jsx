import React from 'react'

//using props from MessageIndex file
const Messages = ({ message, fetchMessages }) => {
  // logs the message
  console.log({message})



  return (
    <div>
      <h5> {message.user?.firstName} {message.user?.lastName} </h5>
      <h4> {new Date(message.createdAt).toLocaleString()} </h4>
      <h3> {message.text} </h3>

    </div>
  )
}

export default Messages