import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { MessageContext } from "./context/MessageContext";
import React, { useContext, useState } from "react";

const EditForm = ({ theMessage }) => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, messageId, newMessageName, text, jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [message, setMessage] = useState("");

  const changeMessage = async () => {
    var obj = {
      userId: userID.id,
      messageId: id,
      newMessageName: messageName,
      text: switchMessage,
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

  const id = theMessage.id;

  const [messageName, setMessageName] = useState(theMessage.messageName);
  const [switchMessage, setSwitchMessage] = useState(theMessage.switchMessage);

  const { updateMessage } = useContext(MessageContext);

  const updatedMessage = { id, messageName, switchMessage };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeMessage(e);
    updateMessage(id, updatedMessage);
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
          onChange={(e) => setMessageName(e.target.value)}
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
          onChange={(e) => setSwitchMessage(e.target.value)}
        />
      </Form.Group>
      <div style={{ paddingLeft: 20 }}>
        <Button className="mt-4 button" type="submit" block>
          Edit Messsage
        </Button>
      </div>
    </Form>
  );
};

export default EditForm;
