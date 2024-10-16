import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "./forms.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
      //userId: userId
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Login Successful");
        console.log("Response data:", response.data);
        const { userId } = response.data;
        console.log("User ID from backend:", userId);
        login(userId);
      }
    } catch (error) {
      const data = error.response
        ? error.response.data
        : {
            error: "An error occured",
          };
      setMessage(data.error || "Login Failed");
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2>Login</h2>
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login__submit" type="submit">
              <span className="button__icon">
                <i className="fas fa-arrow-right"></i>
              </span>
              <span>Log In</span>
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape1"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape4"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
