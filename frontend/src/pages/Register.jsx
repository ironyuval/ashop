import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
  const history = useNavigate();

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
    //ask
    ev.preventDefault();

    setShowPasswordErrorMsg(password !== confirmPassword);

    const validatedValue = Joi.validate(
      { email, password, confirmPassword, name },
      registerSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedValue;

    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      if (password === confirmPassword) {
        axios
          .post("/register", {
            name: name,
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            history.push("/login", { email: email, password: password });
          })
          .catch((err) => {
            console.log("err from axios", err);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please Fill The Following:</h1>
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
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1" /* checked={isBiz} */
          /*           onChange={handleCBChanged}
           */
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out if you are a buisness
        </label>
        <br></br>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Register;
