import React, { useState } from 'react';
import Navbar from './Navbar';
// A simple FeedbackForm component that is a modal
const Feedback= ({ onClose }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedbackText);
    // Here you would typically send the feedback to an API
    onClose(); // Close the modal after submission
    alert('Thank you for your feedback!');
  };

  return (
    <>
    <Navbar />
    <div>
         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Give Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="Tell us what you think..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  
    </div>
    </>
  )
}

export default Feedback
