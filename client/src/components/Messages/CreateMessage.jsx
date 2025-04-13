import React, { useRef } from 'react'

const CreateMessage = ( {fetchMessages, selectedRoom, userId} ) => {
  const textInputRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          user: userId,
          room: selectedRoom._id,
          body: textInputRef.current.value
        })
      })

      const data = await response.json()
      console.log(data)
      textInputRef.current.value = ""

      fetchMessages()

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="messages" onSubmit={handleSubmit}>
      <input className="createMessageInput" ref={textInputRef} type="text" maxLength="150" required placeholder='Add a message...' />
      <button className="button" >📨 Create 📨</button>
    </form>
  )
}

export default CreateMessage