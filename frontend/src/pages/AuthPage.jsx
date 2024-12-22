import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true); // To toggle between Sign In and Sign Up forms
  const navigate = useNavigate(); // To handle redirection to home page

  const handleSignInSuccess = () => {
    navigate("/home"); // Redirect to homepage
  };

  return (
    <div className="auth">
      <div className="auth-page">
        <div className="form-container">
          {isSignIn ? (
            <SignIn
              onSignInSuccess={handleSignInSuccess}
              toggleForm={() => setIsSignIn(false)}
            />
          ) : (
            <SignUp toggleForm={() => setIsSignIn(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
