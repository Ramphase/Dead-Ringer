import React, {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ContactContext = createContext()

const ContactContextProvider  = (props) => {

    const [contacts, setContacts] = useState([
        {id:uuidv4(), firstName:"",lastName:"", email:"", phone:""},
])

useEffect(()=> {
    setContacts(JSON.parse(localStorage.getItem('contacts')))
},[])

useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
})



const sortedContacts = contacts.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addContact = (firstName, lastName, email, phone) => {
    setContacts([...contacts , {id:uuidv4(), firstName, lastName, email, phone}])
}

const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
}

const updateContact = (id, updatedContact) => {
    setContacts(contacts.map((contact) => contact.id === id ? updatedContact : contact))
}

    return (
        <ContactContext.Provider value={{sortedContacts, addContact, deleteContact, updateContact}}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider;