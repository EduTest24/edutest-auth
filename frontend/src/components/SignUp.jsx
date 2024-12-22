import React, { useState } from "react";
import axios from "axios";
import zxcvbn from "zxcvbn";

const SignUp = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 to 4 (scale of strength)
  const [passwordFeedback, setPasswordFeedback] = useState(""); // Optional: Display feedback text

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://edutest-frontend.onrender.com/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      alert(response.data.message);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toggleForm(); // Switch to SignIn form
      }
    } catch (err) {
      console.error(err);
      alert("Sign Up failed. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Check password strength using zxcvbn
    const result = zxcvbn(password);
    setPasswordStrength(result.score); // Score: 0 to 4

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordFeedback("Password must be at least 8 characters long.");
    } else {
      if (!hasUpperCase || !hasLowerCase) {
        setPasswordFeedback(
          "Password must contain both uppercase and lowercase letters."
        );
      }
      if (!hasDigits) {
        setPasswordFeedback("Password must contain at least one digit.");
      }
      if (!hasSpecialChars) {
        setPasswordFeedback(
          "Password must contain at least one special character."
        );
      }
    }
  };

  const getProgressBarColor = () => {
    if (passwordStrength === 0) return "#ff0000"; // Weak
    if (passwordStrength === 1) return "#ff7f00"; // Fair
    if (passwordStrength === 2) return "#ffff00"; // Good
    if (passwordStrength === 3) return "#7fff00"; // Strong
    return "#00ff00"; // Very Strong
  };

  return (
    <form onSubmit={handleSignUp} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      {/* Password Strength Progress Bar */}
      <div style={{ marginTop: "10px", width: "100%" }}>
        <div
          style={{
            height: "8px",
            width: `${(passwordStrength / 4) * 100}%`,
            backgroundColor: getProgressBarColor(),
            borderRadius: "5px",
          }}
        />
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#aaa" }}>
        {passwordFeedback && <span>{passwordFeedback}</span>}
      </div>

      <button type="submit">Sign Up</button>
      <p className="toggle-link">
        Already have an account?{" "}
        <button type="button" onClick={toggleForm}>
          Sign In
        </button>
      </p>
    </form>
  );
};

export default SignUp;
