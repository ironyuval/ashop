import api from "../../../api";
import { onTokenReceived } from "../../App/logic";
import { isDevelopment } from "../../../utils";
import getModalById from "../../../utils/getModalById";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from "../../../server-shared/validation/register.validation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RegisterModal = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errors, setErrors] = useState({});

  const isValid =
    nameRef.current?.value &&
    emailRef.current?.value &&
    passwordRef.current?.value &&
    confirmPasswordRef.current?.value &&
    !Object.keys(errors).length;

  const dispatch = useDispatch();

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

  const handleValidateConfirmPass = (e) => {
    const value = e.target.value;
    const password = passwordRef.current.value;

    console.log(value);
    if (value && value !== password) {
      handleError("confirmPassword", `password does not match password`);
    } else {
      clearError("confirmPassword");
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    console.log("ok");
    try {
      ev.preventDefault();

      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const res = await api.Auth.register(name, email, password);
      const user = res.data.result;
      const { token } = user;
      dispatch(onTokenReceived(token));
      const registerModal = getModalById("registerModal");
      registerModal.hide();
      toast.success("User registered succesfully");
    } catch (err) {
      console.log("err from axios", err);

      const message = err.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Register
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
            <form id="form" onSubmit={handleSubmit}>
              <h1>Please Fill The Following To Register:</h1>
              <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                  Name
                </label>
                <input
                  ref={nameRef}
                  onBlur={handleValidateBySchema("name", nameSchema)}
                  type="text"
                  className={`form-control ${
                    errors["name"] ? "is-invalid" : ""
                  }`}
                  id="exampleInputName1"
                  aria-describedby="emailHelp"
                />
                <div className="invalid-feedback">{errors["name"]}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  onBlur={handleValidateBySchema("email", emailSchema)}
                  type="email"
                  className={`form-control ${
                    errors["email"] ? "is-invalid" : ""
                  }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div className="invalid-feedback">{errors["email"]}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  defaultValue={isDevelopment ? "123456aaAA!" : ""}
                  ref={passwordRef}
                  onBlur={handleValidateBySchema("password", passwordSchema)}
                  type="password"
                  className={`form-control ${
                    errors["password"] ? "is-invalid" : ""
                  }`}
                  id="exampleInputPassword1"
                />
                <div className="invalid-feedback">{errors["password"]}</div>
              </div>
              <div>
                <label
                  htmlFor="exampleInputConfirmPassword1"
                  className="form-label"
                >
                  Confirm Password
                </label>
                <input
                  defaultValue={isDevelopment ? "123456aaAA!" : ""}
                  ref={confirmPasswordRef}
                  onBlur={handleValidateConfirmPass}
                  type="password"
                  className={`form-control ${
                    errors["confirmPassword"] ? "is-invalid" : ""
                  }`}
                  id="exampleInputConfirmPassword1"
                />
                <div className="invalid-feedback">
                  {errors["confirmPassword"]}
                </div>
              </div>
            </form>
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
              disabled={!isValid}
              form="form"
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
