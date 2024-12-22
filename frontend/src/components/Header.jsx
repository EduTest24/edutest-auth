import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faTachometerAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SignOutConfirmationModal from "../components/SignOutConfirmationModal";
import PopMessageDisplayer from "../components/PopMessageDisplayer";
import axios from "axios";
import "./header.css";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("token");
  const [popMessage, setPopMessage] = useState({ message: "", type: "" });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userLogoRef = useRef(null);

  // Handle dashboard redirection
  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  // Toggle the visibility of the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !userLogoRef.current.contains(e.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSignOut = async () => {
    const email = localStorage.getItem("email");

    try {
      await axios.post("http://localhost:5000/auth/signout", { email });

      // Clear user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      setUsername(null);
      setIsModalOpen(false); // Close modal after sign out
      setPopMessage({
        message: "Signed out successfully!",
        type: "success",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Sign out failed");
    }
  };

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSignOut = () => {
    setIsModalOpen(true);
    setIsDropdownVisible(false);
  }; // Open the modal
  const onSignIn = () => navigate("/auth");

  return (
    <>
      <header className="header bg-gray-900 text-white">
        <h1 className="website-name text-2xl font-semibold">
          <a href="/">EduTEST</a>
        </h1>

        {/* Hamburger Icon for Small Screens */}
        <div className="hamburger-icon md:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <nav className={`nav-links ${isMenuOpen ? "block" : "hidden"} md:flex`}>
          <a href="/studymaterial" className="nav-link">
            Study Material
          </a>
          <a href="/entranceexam" className="nav-link">
            Exams
          </a>
          <a href="/about" className="nav-link">
            About Us
          </a>
        </nav>

        <div className="auth-container">
          {username ? (
            <div className="user-info">
              {/* User logo (first letter of the username) */}
              <div
                className="user-logo"
                onClick={toggleDropdown}
                title="Click to open menu"
                ref={userLogoRef}
              >
                {username[0].toUpperCase()}
              </div>

              {/* Dropdown menu */}
              {isDropdownVisible && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <button
                    className="dashboard-btn"
                    onClick={handleDashboardRedirect}
                  >
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      className="btn-icon"
                    />{" "}
                    Dashboard
                  </button>
                  <button className="sign-out-btn" onClick={onSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="btn-icon" />{" "}
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="sign-in-button" onClick={onSignIn}>
              Sign In{" "}
              <FontAwesomeIcon icon={faSignInAlt} className="btn-icon" />
            </button>
          )}
        </div>
      </header>
      <SignOutConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleSignOut} // Call handleSignOut if user confirms
        onCancel={() => setIsModalOpen(false)} // Close modal on cancel
      />
      <PopMessageDisplayer
        message={popMessage.message}
        type={popMessage.type}
        duration={3000}
        onClose={() => setPopMessage({ message: "", type: "" })}
      />
    </>
  );
};

export default Header;
