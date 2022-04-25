import { Form, Button } from "react-bootstrap"
import {SwitchContext} from './contexts/SwitchContext';
import React, {useContext, useState} from 'react';
import axios from 'axios';

const AddForm = () =>{

    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');
    
    var userToken = storage.retrieveToken();
    var userID = localStorage.getItem('user_data');

    var myMessages = [];
    const myContacts = [];
        
        var obj = {userId:userID,jwtToken:userToken};
        var js = JSON.stringify(obj);
        
        var config =  
        {
            method: 'post',
            url: bp.buildPath('displayMessages'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) 
            {
                var res = response.data;
                if (res.error) 
                {
                    console.log("ERROR");
                    /*   setMessage('You have no contacts'); */
                } else {
                    var jwt = require('jsonwebtoken');
                    var ud = jwt.decode(res,{complete:true});
                    console.log("IT WORKS?");
                    myMessages = ud.payload.results;
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            }); 
     



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
                    onChange = { (e) => onInputChange(e)}
                >
                
                {/*
                    myMessages.map(msg => (
                    <Form.Option value={msg.MessageName}> {msg.MessageName} </Form.Option>
                    ))
                    */}
                
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Select
                    placeholder="MsgId"
                    name="msgId"
                    onChange={(e) => {onInputChange(e)}} 
                >
                {   
                    myMessages.map(msg => (
                    <Form.Option value={msg.MessageName}> {msg.MessageName} </Form.Option>
                    ))
                }
                </Form.Select>
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