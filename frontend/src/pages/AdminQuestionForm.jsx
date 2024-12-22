import React, { useState } from "react";
import axios from "axios";
import "./AdminQuestionForm.css"; // Assuming custom CSS for styling

const AdminQuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [solution, setSolution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !questionText ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption ||
      !solution
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    const questionData = {
      questionText,
      options: [optionA, optionB, optionC, optionD],
      correctOption,
      solution,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/questions",
        questionData
      );
      alert("Question added successfully!");
      // Reset form fields
      setQuestionText("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectOption("");
      setSolution("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to add question.");
    }
  };

  return (
    <div className="admin-question-form">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option A:</label>
          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option B:</label>
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option C:</label>
          <input
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Option D:</label>
          <input
            type="text"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correct Option (A/B/C/D):</label>
          <input
            type="text"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value.toUpperCase())}
            required
          />
        </div>
        <div>
          <label>Solution (Explanation):</label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AdminQuestionForm;
