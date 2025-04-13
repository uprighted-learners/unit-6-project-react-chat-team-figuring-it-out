import React, { useState, useEffect } from 'react'
import Message from './Message'
import CreateMessage from './CreateMessage'
import "./MessageIndex.css"

const MessageIndex = (props) => {
    const [selectedRoom, setSelectedRoom] = useState(() => {
        const storedRoom = localStorage.getItem("selectedRoom");
        return storedRoom ? JSON.parse(storedRoom) : null;
    })
    const [messages, setMessages] = useState([])

    // Loads up all messages upon initial page navigation
    useEffect(() => {
        if (selectedRoom) {
            fetchMessages()
        }
    }, [selectedRoom])

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


            if (data.Error && !data.Results) {
                throw new Error(data.Error)
            }
            // sets all retrieved messages to the useMessages state variable
            setMessages(data.Results || [])

        } catch (error) {
            console.log(error)
        }
    }


    return <div>

        {selectedRoom ? (
            <>
                <h1>{selectedRoom.name}</h1>

                {/* Create Message Form */}
                <CreateMessage
                    selectedRoom={selectedRoom}
                    userId={localStorage.getItem("uid")}
                    fetchMessages={fetchMessages}
                />

                {messages.length > 0 ? (
                    messages.map((message) => (
                        <Message key={message._id} message={message} fetchMessages={fetchMessages} />
                    )).reverse()
                ) : (
                    <h2>No messages yet</h2>
                )}
            </>
        ) : (
            <h2>Room not selected</h2>
        )}


    </div>

}

export default MessageIndex