import React, { useContext, useState, useEffect } from "react";
import { ContactContext } from "./context/ContactContext";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap";
import EditForm from "./EditForm";
import axios from "axios";

const Contact = ({ contact }) => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: contactId, userId
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [message, setMessage] = useState("");

  const removeContact = async (event) => {
    var obj = {
      contactId: contact.contactId,
      userId: userID.id,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("deleteContact"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    axios(config).then(function (response) {
      var res = response.data;
      if (res.error) {
        console.log(res.error);
      } else {
        console.log("Contact Successfully deleted.");
      }
    });
  };

  const { deleteContact } = useContext(ContactContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [contact]);

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <td style={{ color: "white", fontSize: 20 }}>{contact.firstName}</td>
      <td style={{ color: "white", fontSize: 20 }}>{contact.lastName}</td>
      <td style={{ color: "white", fontSize: 20 }}>{contact.email}</td>
      <td style={{ color: "white", fontSize: 20 }}>{contact.phoneNumber}</td>
      <td>
        <ButtonGroup>
          <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
            <button
              onClick={handleShow}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE3C9;</i>
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
          >
            <button
              onClick={() => {
                removeContact();
                deleteContact(contact.contactId);
              }}
              className="btn text-danger btn-act"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE872;</i>
            </button>
          </OverlayTrigger>
        </ButtonGroup>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>className="small-title"</Modal.Header>
        <Modal.Body>
          <EditForm theContact={contact} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contact;
