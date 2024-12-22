import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopMessageDisplayer from "./PopMessageDisplayer"; // Import the PopMessageDisplayer component

const SignIn = ({ onSignInSuccess, toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popMessage, setPopMessage] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        username,
        password,
      });

      setPopMessage({
        message: response.data.message,
        type: "success",
      });
      // Store token and username in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email); // Store the email for sign-out tracking

      onSignInSuccess(); // Redirect to home page
      navigate("/"); // Redirect to home after sign-in
    } catch (err) {
      console.error(err);

      // Show error message in pop-up
      setPopMessage({
        message: "Sign In failed. Please check your credentials.",
        type: "error",
      });
    }
  };

  return (
    <div>
      {/* Pop-Up Message Display */}
      <PopMessageDisplayer
        message={popMessage.message}
        type={popMessage.type}
        duration={3000} // Message will disappear after 3 seconds
        onClose={() => setPopMessage({ message: "", type: "" })}
      />

      <form onSubmit={handleSignIn} className="auth-form">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <p className="toggle-link">
          Don’t have an account?{" "}
          <button type="button" onClick={toggleForm}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
