import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/register",
        userData
      );
      if (response.status === 200) {
        setMessage("User created successfully");
        login();
        window.location.href = "/login";
      }
    } catch (error) {
      setMessage(
        `Error creating user: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2>Register</h2>
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-envelope"></i>
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
              <span>Register</span>
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
