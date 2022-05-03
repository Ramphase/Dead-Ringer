import { Modal, Button, Alert } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { ContactContext } from "./context/ContactContext";
import Contact from "./Contact";
import AddForm from "./AddForm";
import Pagination from "./Pagination";

const ContactsList = () => {
  const { sortedContacts } = useContext(ContactContext);

  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //const handleShowAlert = () =>setShowAlert(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [sortedContacts]);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPagesNum = Math.ceil(sortedContacts.length / contactsPerPage);

  return (
    <>
      <div className="innerbox">
        <div className="bg table-title">
          <h1>Dead Ringer | Contacts</h1>
          <p>
            Create and modify custom contacts to send to your message in the
            event that your dead man switch is triggered.
          </p>
          <div className="container">
            <Alert show={showAlert} variant="success">
              Contacts Updated Succefully!
            </Alert>

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className="smaller-title">First</th>
                  <th className="smaller-title">Last</th>
                  <th className="smaller-title">Email</th>
                  <th className="smaller-title">Phone</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.map((contact) => (
                  <tr name={contact.id} value={contact.id}>
                    <Contact contact={contact} />
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <Button
                onClick={handleShow}
                className="button mt-3 mb-4"
                data-toggle="modal"
              >
                <span>Add New Contact</span>
              </Button>
            </div>

            <Pagination
              pages={totalPagesNum}
              setCurrentPage={setCurrentPage}
              currentContacts={currentContacts}
              sortedContacts={sortedContacts}
            />
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="small-title">Create Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddForm />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ContactsList;
