import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { SwitchContext } from "./contexts/SwitchContext";
import React, { useContext, useState } from "react";

const EditForm = ({ theSwitch }) => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, triggerId, newTriggerName, jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [message, setMessage] = useState("");

  const changeTriggerName = async () => {
    var obj = {
      userId: userID.id,
      triggerId: id,
      newTriggerName: name,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("editMessage"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    const response = await axios(config);
    var res = response.data;
    if (res.error) {
      console.log("Failure");
    } else {
      console.log("Successfully Updated");
    }
  };

  const id = theSwitch.id;

  const [name, setName] = useState(theSwitch.name);
  const [contactId, setContact] = useState(theSwitch.contactId);
  const [msgId, setMsg] = useState(theSwitch.msgId);
  const [timer, setTimer] = useState(theSwitch.timer);

  const { updateSwitch } = useContext(SwitchContext);

  const updatedSwitch = { id, name, contactId, msgId, timer };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSwitch(id, updatedSwitch);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          placeholder="Contact *"
          name="contact"
          value={contactId}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          placeholder="msgId"
          name="msgId"
          value={msgId}
          onChange={(e) => setMsg(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="timer"
          name="timer"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Edit Switch
      </Button>
    </Form>
  );
};

export default EditForm;
