import React from "react";
import { FaTwitter, FaGithub, FaInstagram, FaDiscord, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full px-8 py-10">
        <hr className="p-4" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Brand Section */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Enhanso{" "}
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-semibold">
              PRO
            </span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Change any blurry or old image into a 4k quality image with an all-in-one
            free AI-powered photo enhancer and restorer tool. Restore clarity, increase
            resolution, denoise, remove background, and more.
          </p>
          <div className="flex items-center gap-4 mt-4 text-xl">
            <FaTwitter className="cursor-pointer hover:text-yellow-400" />
            <FaGithub className="cursor-pointer hover:text-yellow-400" />
            <FaInstagram
              className="cursor-pointer hover:text-yellow-400"
              onClick={() => window.open("https://instagram.com/rizakdeep-singh", "_blank")}
            />
            <FaDiscord className="cursor-pointer hover:text-yellow-400" />
          </div>
          <div className="flex items-center justify-between mt-5 border border-gray-700 rounded px-4 py-2 cursor-pointer hover:border-yellow-400">
            <FaGlobe className="text-lg" />
            <span className="flex-1 text-center">English</span>
            <span className="text-gray-400">▼</span>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Pricing</li>
            <li className="hover:text-yellow-400 cursor-pointer">Features</li>
            <li className="hover:text-yellow-400 cursor-pointer">API</li>
          </ul>
        </div>

        {/* AI Tools */}
        <div>
          <h3 className="font-semibold mb-3">AI Tools</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">AI Image Enhancer</li>
            <li className="hover:text-yellow-400 cursor-pointer">AI Anime Enhancer</li>
            <li className="hover:text-yellow-400 cursor-pointer">AI Photo Restoration</li>
            <li className="hover:text-yellow-400 cursor-pointer">AI Image Colorizer</li>
            <li className="text-yellow-400 font-semibold mt-2">AI REMOVAL</li>
            <li className="hover:text-yellow-400 cursor-pointer">AI Object Remover</li>
            <li className="hover:text-yellow-400 cursor-pointer">AI Background Remover</li>
            <li className="text-yellow-400 font-semibold mt-2">AI FACE TOOLS</li>
            <li className="hover:text-yellow-400 cursor-pointer">AI Face Swap Tool</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
            <li className="hover:text-yellow-400 cursor-pointer">Help Center</li>
            <li
              className="hover:text-yellow-400 cursor-pointer"
              onClick={() => window.open("mailto:srizak95@gmail.com")}
            >
              Email Support
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">Donate</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p className="text-yellow-400">Powered by Riz AI</p>
        <p>© 2025 Rizsel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
