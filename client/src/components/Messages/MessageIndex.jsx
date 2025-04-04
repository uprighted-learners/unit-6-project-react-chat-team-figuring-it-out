import React, { useState, useEffect } from 'react'
import Messages from './Messages'

const MessageIndex = () => {
    const [messages, setMessages] = useState([])

    // Loads up all messages upon initial page navigation
    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {

        const response = await fetch("http://localhost:8080/messages/all", {
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
        {/* Returns each message within the array */}
        {messages.map( (message) => <>Messages are here</> )}

    </div>

}

export default MessageIndex