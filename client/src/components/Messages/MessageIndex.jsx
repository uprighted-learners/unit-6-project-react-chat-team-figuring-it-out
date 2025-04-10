import React, { useState, useEffect } from 'react'
import Messages from './Messages'
import CreateMessage from './CreateMessage'

const MessageIndex = ({selectedRoom}) => {
    const [messages, setMessages] = useState([])

    // Loads up all messages upon initial page navigation
    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {

        const response = await fetch(`http://localhost:8080/messages/all/${selectedRoom}`, {
            // Gathering all messages from the database
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        // stores data gathered in a variable for displaying in JSON format
        const data = await response.json()
        console.log(data)

        // sets all retrieved messages to the useMessages state variable
        setMessages(data.Results)

    }


    return <div>
        {/* Rendering Message Component */}
     

        {/* <h1>message1</h1> */}
        {/* {messages.map( (message) => <>Messages are here</> )} */}

        <Messages fetchMessages={fetchMessages} />

        {/* Returns each message within the array */}
        {messages.map((message) => <Messages key={message._id} message={message} fetchMessages={fetchMessages} />).reverse()}


    </div>

}

export default MessageIndex