import { Form, Button } from "react-bootstrap"
import {ContactContext} from './context/ContactContext';
import React, {useContext, useState} from 'react';

const EditForm = ({theContact}) =>{

    const id = theContact.id;

    const [name, setName] = useState(theContact.name);
    const [email, setEmail] = useState(theContact.email);
    const [phone, setPhone] = useState(theContact.phone);

    const {updateContact} = useContext(ContactContext);

    const updatedContact = {id, name, email, phone}

    const handleSubmit = (e) => {
        e.preventDefault(); 
        updateContact(id, updatedContact)
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange = { (e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}                    
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={(e)=> setPhone(e.target.value)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Edit Contact
            </Button>
        </Form>

     )
}

export default EditForm;