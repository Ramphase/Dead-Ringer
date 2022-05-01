import { Modal, Button, Alert } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { SwitchContext } from "./contexts/SwitchContext";
import MySwitch from "./MySwitch";
import AddForm from "./AddForm";
import Pagination from "./Pagination";

const SwitchesComponent = () => {
  const { sortedSwitches } = useContext(SwitchContext);

  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //const handleShowAlert = () =>setShowAlert(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [SwitchesPerPage] = useState(2);

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
  }, [sortedSwitches]);

  const indexOfLastSwitch = currentPage * SwitchesPerPage;
  const indexOfFirstSwitch = indexOfLastSwitch - SwitchesPerPage;
  const currentSwitches = sortedSwitches.slice(
    indexOfFirstSwitch,
    indexOfLastSwitch
  );
  const totalPagesNum = Math.ceil(sortedSwitches.length / SwitchesPerPage);

  return (
    <>
      <div className="innerbox">
        <div className="table-title">
          <h1>Manage | Switches</h1>
          <p>
            Create and customize your dead man switches by using the option
            buttons below. You can quickly activate and deactivate them here
            too.{" "}
          </p>

          <Alert show={showAlert} variant="success">
            Switch List Updated Succefully!
          </Alert>

          <div className="container">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Msg</th>
                  <th>Timer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSwitches.map((Switch) => (
                  <tr key={Switch.id}>
                    <MySwitch Switch={Switch} />
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
                <span>Create New Switch</span>
              </Button>
            </div>

            <Pagination
              pages={totalPagesNum}
              setCurrentPage={setCurrentPage}
              currentSwitches={currentSwitches}
              sortedSwitches={sortedSwitches}
            />
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Switch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default SwitchesComponent;
