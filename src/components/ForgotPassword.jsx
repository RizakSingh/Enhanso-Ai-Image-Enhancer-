import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setResetLink(res.data.resetLink || "");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">

        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-3 py-2 rounded text-black mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {resetLink && (
          <div className="mt-4 text-sm break-all">
            <p className="font-semibold">Reset Link (Dev mode):</p>
            <a href={resetLink} className="text-blue-600 underline">
              {resetLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
