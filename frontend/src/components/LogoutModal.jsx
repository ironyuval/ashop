import { setIsLogoutModalShown, setUser } from "../redux/slice";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";

const LogoutModal = () => {
  const isShown = useSelector((state) => state.app.isLogoutModalShown);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setIsLogoutModalShown(false));

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser({}));
    handleClose();
  };

  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;
