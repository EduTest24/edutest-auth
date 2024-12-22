import React from "react";
import "./SignOutConfirmationModal.css";

const SignOutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Don't render the modal if it isn't open

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Confirm Sign Out</h3>
        <p>Are you sure you want to sign out?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Yes, Sign Out
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmationModal;
