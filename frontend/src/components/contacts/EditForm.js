import { Form, Button } from "react-bootstrap"
import {ContactContext} from './context/ContactContext';
import React, {useContext, useState} from 'react';

const EditForm = ({theContact}) =>{

    const id = theContact.id;

    const [firstName, setFirstName] = useState(theContact.firstName);
    const [lastName, setLastName] = useState(theContact.lastName);
    const [email, setEmail] = useState(theContact.email);
    const [phone, setPhone] = useState(theContact.phone);

    const {updateContact} = useContext(ContactContext);

    const updatedContact = {id, firstName, lastName, email, phone}

    const handleSubmit = (e) => {
        e.preventDefault(); 
        updateContact(id, updatedContact)
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    className="mb-2 mt-1"
                    onChange = { (e) => setFirstName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    className="mb-2 mt-1"
                    onChange = { (e) => setLastName(e.target.value)}
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