import { Form, Button } from "react-bootstrap"

import {ContactContext} from './context/ContactContext';
import React, {useContext, useState} from 'react';


const AddForm = () =>{

    const {addContact} = useContext(ContactContext);

    const [newContact, setNewContact] = useState({
        name:"", email:"", phone:""
    });

    const onInputChange = (e) => {
        setNewContact({...newContact,[e.target.name]: e.target.value})
    }

    const {name, email, phone} = newContact;

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(name, email, phone);
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    className="mb-2 mt-1"
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    className="mb-2"
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <div style={{paddingLeft:20}}>
            <Button className="mt-4 button" type="submit" block>
                Create Contact
            </Button>
            </div>
            
        </Form>

     )
}

export default AddForm;