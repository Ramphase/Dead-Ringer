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
    var obj = { contactId: contact.id, userId: userID.id, jwtToken: userToken };
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
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
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
                deleteContact(contact.id);
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
        <Modal.Header closeButton>
          <Modal.Title className="small-title">Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theContact={contact} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Contact;
