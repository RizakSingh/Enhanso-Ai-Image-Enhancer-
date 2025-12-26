import React, { useState } from "react";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";

const LoginPage = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter full details");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // 🔐 Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "enhansoUser",
        JSON.stringify(res.data.user)
      );

      onLogin(res.data.user);
      onClose();
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LOGIN MODAL */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">

          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-xl text-gray-700 hover:text-red-600"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* 🔑 FORGOT PASSWORD LINK */}
          <p
            onClick={() => setShowForgot(true)}
            className="mt-4 text-sm text-center text-blue-600 cursor-pointer hover:underline"
          >
            Forgot password?
          </p>
        </div>
      </div>

      {/* 🔥 FORGOT PASSWORD MODAL */}
      {showForgot && (
        <ForgotPassword onClose={() => setShowForgot(false)} />
      )}
    </>
  );
};

export default LoginPage;
