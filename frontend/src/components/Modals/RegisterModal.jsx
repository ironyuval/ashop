import registerSchema from "../../validation/register.validation";
import api from "../../api";
import { onTokenReceived } from "../../components/App/logic";
import { isDevelopment } from "../../utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RegisterModal = () => {
  const [name, setName] = useState(isDevelopment ? "Dev" : "");
  const [email, setEmail] = useState(
    isDevelopment ? "galbenyosef@gmail.com" : ""
  );
  const [password, setPassword] = useState(
    isDevelopment ? "12345678AAaa-" : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    isDevelopment ? "12345678AAaa-" : ""
  );
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleConfirmPassword = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setShowPasswordErrorMsg(password !== confirmPassword);

    const validatedValue = registerSchema.validate({
      name,
      email,
      password,
      confirmPassword,
    });
    const { error } = validatedValue;

    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      if (password === confirmPassword) {
        api.Auth.register(name, email, password)
          .then((res) => {
            const user = res.data.result;
            const { token } = user;
            dispatch(onTokenReceived(token));
            navigate("/");
            toast.success("User registered succesfully");
          })
          .catch((err) => {
            console.log("err from axios", err);

            const message = err.response.data.message;
            toast.error(message);
          });
      }
    }
  };

  const validateMinLength = (text, num) => text.length > num;
  /*   const validateMail = (mail) => Regex.match(mail);
   */
  const nameValid = !name.length || validateMinLength(name, 2);

  /*   const mailValid = validateMail(mail);
   */

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
            <form onSubmit={handleSubmit}>
              <h1>Please Fill The Following To Register:</h1>
              <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${nameValid ? "" : "is-invalid"}`}
                  id="exampleInputName1"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={handleNameChange}
                />
                <div className="invalid-feedback">
                  Please enter a message in the textarea.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${true ? "" : "is-invalid"}`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {password.length < 8 && (
                <div className="alert alert-warning" role="alert">
                  A simple warning alert—check it out!
                </div>
              )}
              <div className="mb-3">
                <label
                  htmlFor="exampleInputConfirmPassword1"
                  className="form-label"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputConfirmPassword1"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
              </div>
              {showPasswordErrorMsg && (
                <div className="alert alert-danger" role="alert">
                  The password and confirm password must be the same
                </div>
              )}
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
              onClick={handleSubmit}
              type="button"
              data-bs-dismiss="modal"
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
