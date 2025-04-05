import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message,jwtToken,name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email...."
            onChange={handlechange}
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your password...."
            onChange={handlechange}
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account ?<Link to="/signup"> Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
