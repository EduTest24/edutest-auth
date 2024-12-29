import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axios
        .get(`http://localhost:5000/auth/verify-email?token=${token}`)
        .then((response) => setMessage(response.data.message))
        .catch((err) =>
          setMessage("Verification failed. Token may be invalid or expired.")
        );
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;
