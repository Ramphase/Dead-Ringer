import React, {useContext, useState, useEffect} from 'react';
import {MessageContext} from './context/MessageContext';
import { Modal, Button, OverlayTrigger, Tooltip, ButtonGroup } from 'react-bootstrap';
import EditForm from './EditForm'



const Message = ({message}) => {

    const {deleteMessage} = useContext(MessageContext)

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [message])

    return (
        <>
            <head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </head>
            <td>{message.messageName}</td>
            <td>
                <ButtonGroup>
                     <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE3C9;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => deleteMessage(message.id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>
                </ButtonGroup>
               
                
                
            </td>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Message
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theMessage={message} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
        </>
    )
}

export default Message;