import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Unblur from "./components/Unblur";
import Colorize from "./components/Colorize";
import BgRemove from "./components/BgRemove";
import BelowData from "./components/BelowData";
import BelowData2 from "./components/BelowData2";
import ResetPassword from "./components/ResetPassword";


function App() {
  const [uploadCount, setUploadCount] = useState(0);

  // ✅ This updates count when any image is processed
  const handleUpload = () => setUploadCount(prev => prev + 1);

  return (
    <Router>
<div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">

        {/* 🔹 Navbar with Enhanso Logo and Route Links */}
        <Navbar count={uploadCount} />

        {/* 🔹 All Main Routes */}
        <Routes>
          <Route path="/" element={<Home onUpload={handleUpload} />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/unblur" element={<Unblur onUpload={handleUpload} />} />
          <Route path="/colorize" element={<Colorize onUpload={handleUpload} />} />
          <Route path="/remove-bg" element={<BgRemove onUpload={handleUpload} />} />
        </Routes>

        {/* 🔹 Footer and Additional Info Sections */}
        <hr className="border-gray-600 w-full my-4" />
        <BelowData />
        <BelowData2 />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
