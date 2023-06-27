import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/APIRoutes";
import logoImg from "../../assets/logo.svg";
import "./index.scss";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <form action="" onSubmit={ e => handleSubmit(e) }>
          <div className="brand">
            <img src={ logoImg } alt="logo"/>
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={ e => handleChange(e) }/>
          <input type="password" placeholder="Password" name="password" onChange={ e => handleChange(e) }/>
          <button type="submit">Login User</button>
          <span>Don't have an account? <Link to="/register">Register.</Link></span>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Login;
