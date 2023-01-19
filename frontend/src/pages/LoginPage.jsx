import loginSchema from "../validation/login.validation";
import { setUser } from "../redux/slice";
import api from "../api";
import { usePersistedString } from "../utils/usePersistedString";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("galbenyosef@gmail.com");
  const [password, setPassword] = useState("12345678AAaa-");
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
  const [token, setToken, removeToken] = usePersistedString("token");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

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
      setToken(token);
      toast.success(`Welcome, ${email}!`);
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
