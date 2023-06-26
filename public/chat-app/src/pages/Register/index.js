import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/APIRoutes";
import logoImg from "../../assets/logo.svg";
import "./index.scss";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (username.length < 3) {
      toast.error("Username should be equal or greater than 3 characters.", toastOptions);
      return false;
    }
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, { email, username, password });
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
          <input type="email" placeholder="Email" name="email" onChange={ e => handleChange(e) }/>
          <input type="password" placeholder="Password" name="password" onChange={ e => handleChange(e) }/>
          <input type="password" placeholder="Confirm Password" name="confirmPassword"
                 onChange={ e => handleChange(e) }/>
          <button type="submit">Create User</button>
          <span>Already have an account? <Link to="/login">Login.</Link></span>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Register;
