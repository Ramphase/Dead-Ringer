import { Form, Button } from "react-bootstrap";
import { ContactContext } from "./context/ContactContext";
import React, { useContext, useState } from "react";
import axios from "axios";

const AddForm = () => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, firstName, lastName, email, phoneNumber (not required), jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [message, setMessage] = useState("");

  const doContact = async () => {
    var obj = {
      userId: userID.id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      email: email,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("addContact"),
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
      console.log("Success");
      return res.contactId;
    }
  };

  const { addContact } = useContext(ContactContext);

  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const onInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const { firstName, lastName, email, phone } = newContact;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await doContact(e);
    addContact(id, firstName, lastName, email, phone);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          className="mb-2 mt-1"
          onChange={(e) => onInputChange(e)}
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
          onChange={(e) => onInputChange(e)}
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
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <div style={{ paddingLeft: 20 }}>
        <Button className="mt-4 button" type="submit" block>
          Create Contact
        </Button>
      </div>
    </Form>
  );
};

export default AddForm;
