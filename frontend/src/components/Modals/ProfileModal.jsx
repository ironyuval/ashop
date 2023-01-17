import { setIsProfileModalShown, setUser } from "../../redux/slice";
import api from "../../api";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";

const ProfileModal = () => {
  const isShown = useSelector((state) => state.app.isProfileModalShown);
  const user = useSelector((state) => state.app.user);

  console.log(user);

  const [name, setName] = useState(user ? user.name : "");
  const [image, setImage] = useState(user ? user.image || "" : "");

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    setName(user.name);
    dispatch(setIsProfileModalShown(false));
  };

  const handleSave = async () => {
    const data = {
      name,
      image,
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };

    try {
      await api.User.updateUser(user._id, data);
      dispatch(setUser({ name, image }));
    } catch (e) {
      console.log(e.message);
    }
  };

  if (!user) return null;

  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          {image ? (
            <img height={200} width={200} src={image} />
          ) : (
            <i
              style={{ fontSize: 60 }}
              className="bi bi-person-circle me-1"
            ></i>
          )}
          <div className="input-group mb-3">
            <span className="input-group-text">Username</span>

            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Profile image</span>

            <input
              value={image}
              onChange={handleImageChange}
              type="text"
              className="form-control"
              aria-label="Profile image"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Email</span>

            <input
              value={user.email}
              disabled
              type="text"
              className="form-control"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Old password</span>

            <input
              ref={oldPasswordRef}
              type="text"
              className="form-control"
              aria-label="Old password"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">New password</span>

            <input
              ref={newPasswordRef}
              type="text"
              className="form-control"
              aria-label="New password"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Confirm new password</span>

            <input
              ref={confirmPasswordRef}
              type="text"
              className="form-control"
              aria-label="Confirm new password"
              aria-describedby="basic-addon1"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
