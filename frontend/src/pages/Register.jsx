import registerSchema from "../validation/register.validation";
import { getBasename } from "../utils";
import { setUser } from "../redux/slice";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("Yuval");
  const [email, setEmail] = useState("ironyuval65@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
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
        axios
          .post(`${getBasename()}/api/user/register`, {
            name: name,
            email: email,
            password: password,
          })
          .then((res) => {
            const user = res.data.result;
            const { name, email, type, token } = user;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(
              setUser({
                name,
                email,
                type,
                token,
              })
            );
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

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please Fill The Following To Register:</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName1"
          aria-describedby="emailHelp"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
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
        <label htmlFor="exampleInputConfirmPassword1" className="form-label">
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

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Register;
