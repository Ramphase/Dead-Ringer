import React, {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const MessageContext = createContext()

const MessageContextProvider  = (props) => {

    const [messages, setMessages] = useState([
        {id:uuidv4(), messageName: "", switchMessage:""},
       
])

useEffect(()=> {
    setMessages(JSON.parse(localStorage.getItem('messages')))
},[])

useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
}) 

const sortedMessages = messages.sort((a,b)=>(a.name < b.name ? -1 : 1));

const addMessage = (messageName, switchMessage) => {
    setMessages([...messages , {id:uuidv4(), messageName, switchMessage}])
}

const deleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id))
}

const updateMessage = (id, updatedMessage) => {
    setMessages(messages.map((message) => message.id === id ? updatedMessage : message))
}

    return (
        <MessageContext.Provider value={{sortedMessages, addMessage, deleteMessage, updateMessage}}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider;