import api from "../../../api";
import { onTokenReceived } from "../../App/logic";
import getModalById from "../../../utils/getModalById";

import { isDevelopment } from "../../../utils";
import {
  emailSchema,
  passwordSchema,
} from "../../../server-shared/validation/register.validation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const LoginModal = () => {
  const emailRef = useRef();

  const passwordRef = useRef();

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleError = (errorField, errorMessage) => {
    setErrors((errors) => ({ ...errors, [errorField]: errorMessage }));
  };

  const clearError = (errorField) => {
    const newErrors = { ...errors };
    delete newErrors[errorField];
    setErrors(newErrors);
  };

  const handleValidateBySchema = (name, schema) => (e) => {
    const value = e.target.value;

    const validatedValue = schema.validate(value);

    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        const errorMessage = item.message.split('" ')[1];
        handleError(name, errorMessage);
      }
    } else {
      clearError(name);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(email, password);
    try {
      const response = await api.Auth.login(email, password);
      const token = response.data.token;
      dispatch(onTokenReceived(token));
      const loginModal = getModalById("loginModal");
      loginModal.hide();
    } catch (e) {}
  };

  const handleForgotPassword = () => {};

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
                ref={emailRef}
                defaultValue={isDevelopment ? "ironyuval65@gmail.com" : ""}
                type="text"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onBlur={handleValidateBySchema("email", emailSchema)}
                className={`form-control ${
                  errors["email"] ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors["email"]}</div>
            </div>
            <div className="input-group">
              <span className="input-group-text">password</span>

              <input
                ref={passwordRef}
                defaultValue={isDevelopment ? "123456aaAA!" : ""}
                type="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                onBlur={handleValidateBySchema("password", passwordSchema)}
                className={`form-control ${
                  errors["password"] ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors["password"]}</div>
            </div>
            <div className="input-group">
              <a className="mt-3">Forgot Password</a>
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
              disabled={false}
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
