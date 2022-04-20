import { Form, Button } from "react-bootstrap"

import {SwitchContext} from './contexts/SwitchContext';
import React, {useContext, useState} from 'react';



const AddForm = () =>{

    const {addSwitch} = useContext(SwitchContext);

    const [newSwitch, setNewSwitch] = useState({
        name:"", contactId:"", msgId:"", timer:""
    });

    const onInputChange = (e) => {
        setNewSwitch({...newSwitch,[e.target.name]: e.target.value})
    }

    const {name, contactId, msgId, timer} = newSwitch;

    const handleSubmit = (e) => {
        e.preventDefault();
        addSwitch(name, contactId, msgId, timer);
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Select
                    placeholder="Contact *"
                    name="contact"
                    value={contactId}
                    onChange = { (e) => onInputChange(e)}
                    //required
                />
            </Form.Group>
            <Form.Group>
                <Form.Select
                    placeholder="MsgId"
                    name="msgId"
                    value={msgId}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Timer"
                    name="timer"
                    value={timer}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Add New Switch
            </Button>
        </Form>

     )
}

export default AddForm;