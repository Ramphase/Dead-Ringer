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
      messageName: msgId,
      contactId: contactId,
      time: timer * 60,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    console.log(js);
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

  //console.log(sortedContacts);
  console.log(sortedMessages);
  const [newSwitch, setNewSwitch] = useState({
    name: "",
    contactId: -1,
    msgId: -1,
    timer: "",
  });

  const onInputChange = (e) => {
    e.preventDefault();
    //console.log(e.target.value);
    setNewSwitch({ ...newSwitch, [e.target.name]: e.target.value });
    console.log(newSwitch);
  };

  const [value, setValue] = React.useState(new Date());
  const { name, contactId, msgId, timer } = newSwitch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactId == -1 || msgId == -1) {
      setMessage("No work");
      return;
    }
    const id = await doTrigger(e);
    console.log(timer);
    addSwitch(id, name, contactId, msgId, timer * 60);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          className="mb-2"
          value={newSwitch.name}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          placeholder="Contact"
          name="contactId"
          value={contactId}
          className="mb-2"
          onChange={onInputChange}
          required
        >
          <option disabled value={-1}>
            Select a contact
          </option>
          {sortedContacts.map((contact) => (
            <option value={contact.contactId}>{contact.firstName}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Select
          placeholder="MsgId"
          name="msgId"
          value={msgId}
          className="mb-2"
          onChange={onInputChange}
          required
        >
          <option disabled value={-1}>
            Select a message
          </option>
          {sortedMessages.map((msg) => (
            <option value={msg.messageName}>{msg.messageName}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Minutes"
          name="timer"
          value={timer}
          onChange={onInputChange}
          required
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
