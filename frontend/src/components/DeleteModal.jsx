import { setIsDeleteModalShown, setUser } from "../redux/slice";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";

const DeleteModal = () => {
  const isShown = useSelector((state) => state.app.isDeleteModalShown);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setIsDeleteModalShown(false));

  const handleDelete = () => {
    localStorage.removeItem("user");
    dispatch(setUser({}));
    handleClose();
  };

  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
