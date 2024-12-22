import React from "react";
import "./Modal.css";
import GoToTopButton from "../ScrollToTop";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
      <GoToTopButton />
    </div>
  );
};

export default Modal;
