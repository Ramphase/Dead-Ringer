import { Form, Button } from "react-bootstrap"

import {MessageContext} from './context/MessageContext';
import React, {useContext, useState} from 'react';

const EditForm = ({theMessage}) =>{

    const id = theMessage.id;

    const [messageName, setMessageName] = useState(theMessage.messageName);
    const [switchMessage, setSwitchMessage] = useState(theMessage.switchMessage);

    const {updateMessage} = useContext(MessageContext);

    const updatedMessage = {id, messageName, switchMessage}

    const handleSubmit = (e) => {
        e.preventDefault(); 
        updateMessage(id, updatedMessage)
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Control
                    type="text"
                    placeholder="Name"
                    name="messageName"
                    value={messageName}
                    onChange = { (e) => setMessageName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    as="textarea" 
                    rows={3}
                    placeholder="Enter your message"
                    name="switchMessage"
                    value={switchMessage}
                    onChange = { (e) => setSwitchMessage(e.target.value)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Edit Message
            </Button>
        </Form>

     )
}

export default EditForm;