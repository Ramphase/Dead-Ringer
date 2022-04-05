import { Form, Button } from "react-bootstrap"

import {MessageContext} from './context/MessageContext';
import React, {useContext, useState} from 'react';



const AddForm = () =>{

    const {addMessage} = useContext(MessageContext);

    const [newMessage, setNewMessage] = useState({
        messageName:"", switchMessage:""
    });

    const onInputChange = (e) => {
        setNewMessage({...newMessage,[e.target.name]: e.target.value})
    }

    const {messageName, switchMessage} = newMessage;

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(messageName, switchMessage);
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name="messageName"
                    value={messageName}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    as="textarea" 
                    rows={3}
                    placeholder="Enter your message *"
                    name="switchMessage"
                    value={switchMessage}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Create New Message
            </Button>
        </Form>

     )
}

export default AddForm;