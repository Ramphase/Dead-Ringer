import { Form, Button } from "react-bootstrap";
import { SwitchContext } from "./contexts/SwitchContext";
import React, { useContext, useEffect, useState } from "react";
import { ContactContext } from "../contacts/context/ContactContext";
import { MessageContext } from "../messages/context/MessageContext";
import axios from "axios";

const AddForm = () => {
  const contacts = useContext(ContactContext);
  const messages = useContext(MessageContext);
  const { addSwitch } = useContext(SwitchContext);
  const sortedContacts = contacts.sortedContacts;
  const sortedMessages = messages.sortedMessages;

  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, triggerName, messageName, contactId(s) Ex: [4,6,19], time, jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [message, setMessage] = useState("");

  const doTrigger = async () => {
    var obj = {
      userId: userID.id,
      triggerName: name,
      messageName: messages.messageName,
      contactId: contacts.id,
      time: timer,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("addTrigger"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    const response = await axios(config);
    var res = response.data;
    if (res.error) {
      console.log(res.error);
    } else {
      console.log("Success");
      return res.triggerId;
    }
  };

  console.log(sortedContacts);
  console.log(sortedMessages);
  const [newSwitch, setNewSwitch] = useState({
    id: "",
    name: "",
    contactId: "",
    msgId: "",
    timer: "",
  });

  const onInputChange = (e) => {
    setNewSwitch({ ...newSwitch, [e.target.name]: e.target.value });
  };

  const { id, name, contactId, msgId, timer } = newSwitch;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = doTrigger(e);
    addSwitch(id, name, contactId, msgId, timer);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className="mb-2 mt-1"
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          placeholder="Contact"
          name="contact"
          className="mb-2"
          onChange={(e) => onInputChange(e)}
        >
          {sortedContacts.map((contact) => (
            <option value={contact.firstName}>{contact.firstName}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Select
          placeholder="MsgId"
          name="msgId"
          className="mb-2"
          onChange={(e) => {
            onInputChange(e);
          }}
        >
          {sortedMessages.map((msg) => (
            <option value={msg.messageName}>{msg.messageName}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Timer"
          name="timer"
          value={timer}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <div style={{ paddingLeft: 20 }}>
        <Button className="mt-4 button" type="submit" block>
          Create Switch
        </Button>
      </div>
    </Form>
  );
};

export default AddForm;
