import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success)
      {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name...."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email...."
            onChange={handlechange}
            value={signupInfo.email}
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
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already has an account ?<Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
