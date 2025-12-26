import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";



const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    try {
      setLoading(true);

     await api.post(`/api/auth/reset-password/${token}`, {
  password,
});

      alert("Password reset successful. Please login.");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full border px-3 py-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
