import React, { useState, useEffect } from 'react'
import Message from './Message'
import CreateMessage from './CreateMessage'
import "./MessageIndex.css"

const MessageIndex = ({ selectedRoom }) => {
    const [messages, setMessages] = useState([])

    // Loads up all messages upon initial page navigation
    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/messages/all/${selectedRoom._id}`, {
                // Gathering all messages from the database
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            // stores data gathered in a variable for displaying in JSON format
            const data = await response.json()
            console.log(data)


            if (data.Error) {
                throw new Error(data.Error)
            }
            // sets all retrieved messages to the useMessages state variable
            setMessages(data.Results)

        } catch (error) {
            console.log(error)
        }
    }


    return <div>
        {/* Rendering Message Component */}
        <h1 > {selectedRoom.name} </h1>
    
        {/* Returns each message within the array */}
        {messages.length > 0 ? messages.map((message) => <Message key={message._id} message={message} fetchMessages={fetchMessages} />).reverse(0) : <h1>No messages!</h1> }

    </div>

}

export default MessageIndex