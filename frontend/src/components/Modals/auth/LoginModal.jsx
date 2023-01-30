import loginSchema from "../../../validation/login.validation";
import api from "../../../api";
import { onTokenReceived } from "../../App/logic";
import getModalById from "../../../utils/getModalById";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [email, setEmail] = useState("ironyuval65@gmail.com");

  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const validatedValue = loginSchema.validate({
      email,
      password,
    });
    const { error } = validatedValue;

    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      const response = await api.Auth.login(email, password);
      const token = response.data.token;
      dispatch(onTokenReceived(token));
      const loginModal = getModalById("loginModal");
      loginModal.hide();
    }
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Login
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>

          <div className="modal-body">
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
            <div className="input-group">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
