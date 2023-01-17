import loginSchema from "../validation/login.validation";
import { setUser } from "../redux/slice";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const LoginPage = ({ setLocalStorage }) => {
  const [email, setEmail] = useState("ironyuval65@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
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
      api.Auth.login(email, password)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("userToken", token);
          dispatch(setUser(res.data));
          navigate("/");
          console.log(res.data);
          toast.success(`Welcome, ${res.data.name}!`);
        })
        .catch((err) => {
          console.log("err from axios", err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please Fill The Following To Login:</h1>
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

export default LoginPage;
