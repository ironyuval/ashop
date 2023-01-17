import { removeUser, setIsLoginModalShown, setUser } from "../redux/slice";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginModal = () => {
  const isShown = useSelector((state) => state.app.isLoginModalShown);

  const user = useSelector((state) => state.app.user);

  const [email, setEmail] = useState("ironyuval65@gmail.com");

  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleClose = () => dispatch(setIsLoginModalShown(false));

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text">Email</span>

            <input
              value={email}
              onChange={handleEmailChange}
              type="text"
              className="form-control"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">password</span>

            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              className="form-control"
              aria-label="password"
              aria-describedby="basic-addon1"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
