import { Form, Button } from "react-bootstrap";
import { MessageContext } from "./context/MessageContext";
import React, { useContext, useState } from "react";
import axios from "axios";

const AddForm = () => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, messageName, text, jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [message, setMessage] = useState("");

  const doMessage = async () => {
    var obj = {
      userId: userID.id,
      messageName: messageName,
      text: switchMessage,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("addMessage"),
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
      return res.messageId;
    }
  };

  const { addMessage } = useContext(MessageContext);

  const [newMessage, setNewMessage] = useState({
    messageName: "",
    switchMessage: "",
  });

  const onInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const { messageName, switchMessage } = newMessage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await doMessage(e);
    addMessage(id, messageName, switchMessage);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="messageName"
          value={messageName}
          className="mb-3 mt-1"
          onChange={(e) => onInputChange(e)}
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
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <div style={{ paddingLeft: 20 }}>
        <Button className="mt-4 button" type="submit" block>
          Create Messsage
        </Button>
      </div>
    </Form>
  );
};

export default AddForm;
