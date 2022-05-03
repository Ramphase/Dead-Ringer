import React, { useContext, useState, useEffect, useMemo } from "react";
import { SwitchContext } from "./contexts/SwitchContext";
import { ContactContext } from "../contacts/context/ContactContext";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditForm from "./EditForm";
import axios from "axios";
import Countdown from "react-countdown";
import { Duration } from "luxon";

const MySwitch = ({ Switch }) => {
  var bp = require("../Path.js");
  var storage = require("../../tokenStorage.js");
  // incoming: userId, triggerId, jwtToken
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));
  const startDate = React.useRef(Date.now());
  const [message, setMessage] = useState("");
  const removeTrigger = async () => {
    var obj = {
      userId: userID.id,
      triggerId: Switch.id,
      jwtToken: userToken,
    };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("deleteTrigger"),
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
    }
  };

  const { deleteSwitch } = useContext(SwitchContext);
  const { getContact } = useContext(ContactContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  let contact = {};
  console.log(Number.isNaN(Switch.timer));
  contact = getContact(Switch.contactId);

  useEffect(() => {
    handleClose();
  }, [Switch]);

  return (
    <>
      <td style={{ color: "white", fontSize: 20 }}>{Switch.name}</td>
      <td style={{ color: "white", fontSize: 20 }}>
        {contact ? contact.firstName : ""}
      </td>
      <td style={{ color: "white", fontSize: 20 }}>{Switch.msgId}</td>
      <td style={{ color: "white", fontSize: 20 }}>
        <Countdown
          date={
            startDate.current +
            Duration.fromMillis(parseInt(Switch.timer) * 1000)
          }
          daysInHours={true}
        />
      </td>
      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={() => {
              removeTrigger();
              deleteSwitch(Switch.id);
            }}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="small-title">Edit Switch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theSwitch={Switch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MySwitch;
