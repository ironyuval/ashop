import loginSchema from "../validation/login.validation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("ironyuval65@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
  const history = useNavigate();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
    s;
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setShowPasswordErrorMsg(password !== confirmPassword);

    const validatedValue = loginSchema.validate({
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
          .post("https://ashopauth.herokuapp.com/api/user/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            /*             history.push("/login", { email: email, password: password });
             */
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
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
        <br></br>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
