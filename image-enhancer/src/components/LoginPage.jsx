import React, { useState } from 'react';

const LoginPage = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Enter full details");

    // Save user locally
    const user = { email };
    localStorage.setItem("enhansoUser", JSON.stringify(user));

    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">

        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center text-purple-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
