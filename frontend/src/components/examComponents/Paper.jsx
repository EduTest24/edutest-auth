import React, { useState } from "react";
import "./Paper.css";
import GoToTopButton from "../ScrollToTop";
import Modal from "./Modal";

const ScrollableQuestions = ({ questions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <button className="open-modal-button" onClick={openModal}>
        View Question Paper
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="qp-scrollable-container">
          <h2 className="qp-header">Complete Question Paper</h2>
          <div className="qp-questions-list">
            {questions.map((question, index) => (
              <div key={index} className="qp-card">
                <div className="qp-header-section">
                  <span className="qp-number">Question #{index + 1}</span>
                  <span className="qp-subject">{question.subject}</span>
                </div>
                <div className="qp-body">
                  {question.text && <p className="qp-text">{question.text}</p>}
                  {question.image && (
                    <img
                      className="qp-image"
                      src={question.image}
                      alt={`Question ${index + 1}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <GoToTopButton />
      </Modal>
    </div>
  );
};

export default ScrollableQuestions;
