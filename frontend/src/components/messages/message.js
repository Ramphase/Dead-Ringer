import React, { useContext, useState, useEffect } from "react";
import { MessageContext } from "./context/MessageContext";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap";
import EditForm from "./EditForm";
import axios from "axios";

const Message = ({ message }) => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, messageId, jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const removeMessage = async (event) => {
    var obj = {
      messageId: message.id,
      userId: userID.id,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("deleteMessage"),
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
        console.log("Message Successfully deleted.");
      }
    });
  };

  const { deleteMessage } = useContext(MessageContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [message]);

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <td style={{color :"white", fontSize: 20}}>{message.messageName}</td>
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
                removeMessage();
                deleteMessage(message.id);
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
          <Modal.Title className="small-title">Edit Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theMessage={message} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Message;
