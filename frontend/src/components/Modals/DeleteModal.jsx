import { getBasename } from "../../utils";
import { getStorageToken, getStorageUser } from "../../redux/slice";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ isShown, setIsShown, productId }) => {
  const handleClose = () => setIsShown(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    const config = {
      headers: { Authorization: `Bearer ${getStorageToken()}` },
    };

    /*     setIsLoading(true);
     */ axios
      .delete(`${getBasename()}/api/product/${productId}`, config)
      .then((res) => {
        toast.success("product deleted 😎 ");
        /*         setIsLoading(false);
         */
      })
      .catch((err) => {
        toast.error("new product failed to delete 😎 ");
        console.log(err);
        /*         setIsLoading(false);
         */
      });
    handleClose();
    navigate("/");
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
