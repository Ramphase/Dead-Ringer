import { Form, Button } from "react-bootstrap";
import { ContactContext } from "./context/ContactContext";
import React, { useContext, useState } from "react";
import axios from "axios";

const EditForm = ({ theContact }) => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: contactId, userId, firstName, lastName, email, phoneNumber (not required), jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  //const [message, setMessage] = useState("");

  const changeContact = async () => {
    var obj = {
      userId: userID.id,
      contactId: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("editContact"),
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

  const id = theContact.id;

  const [firstName, setFirstName] = useState(theContact.firstName);
  const [lastName, setLastName] = useState(theContact.lastName);
  const [email, setEmail] = useState(theContact.email);
  const [phone, setPhone] = useState(theContact.phone);

  const { updateContact } = useContext(ContactContext);

  const updatedContact = { id, firstName, lastName, email, phone };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeContact(e);
    updateContact(id, updatedContact);
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
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          className="mb-2"
          onChange={(e) => setLastName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>
      <div style={{ paddingLeft: 20 }}>
        <Button className="mt-4 button" type="submit" block>
          Edit Contact
        </Button>
      </div>
    </Form>
  );
};

export default EditForm;
