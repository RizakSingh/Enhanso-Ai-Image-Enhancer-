# 🚀 Enhanso – AI Image Enhancer (Full Stack)

Enhanso is a **full-stack AI-powered image enhancement platform** that allows users to enhance images using advanced AI features such as **image enhancement, background removal, colorization, and unblur**.  
The application is built using the **MERN stack** and integrates the **PicWish AI API** for image processing.

This project demonstrates **real-world full-stack development**, secure authentication, cloud database usage, and production-grade deployment.

---

## 🌐 Live Links

- **Frontend (Vercel):**  
  https://enhanso-ai-image-enhancer.vercel.app

- **Backend API (Render):**  
  https://enhanso-ai-backend.onrender.com

---

## 🧠 Key Features

- 🔐 User Authentication (Register / Login)
- 🔑 JWT-based Secure Authorization
- 🖼️ AI Image Enhancement
- ✂️ Background Removal
- 🎨 Image Colorization
- 🔍 Image Unblur
- 📤 Image Upload with Preview
- 🗂️ User-specific Image Gallery
- 🔄 Forgot & Reset Password Flow
- 💬 User Feedback Form
- 🔒 Protected API Routes
- ☁️ Cloud Database (MongoDB Atlas)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (File Upload)

### AI / External API
- PicWish AI API

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🧩 Project Architecture

```txt
Frontend (Vercel)
   |
   |  Axios API Calls (JWT Auth)
   ↓
Backend (Render - Express API)
   |
   |  Mongoose ODM
   ↓
MongoDB Atlas (Cloud Database)
   |
   |  Image Processing Requests
   ↓
PicWish AI API

📂 Folder Structure (Simplified)
Enhanso-Ai-Image-Enhancer-
│
├── backend
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   └── App.jsx
│   └── .env
│
└── README.md

🔐 Environment Variables
Backend .env
PORT=5000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PICWISH_API_KEY=your_picwish_api_key
BASE_URL=https://techhk.aoscdn.com/api/tasks/visual
FRONTEND_URL=https://enhanso-ai-image-enhancer.vercel.app

Frontend .env
VITE_API_URL=https://enhanso-ai-backend.onrender.com

⚙️ Installation & Setup (Local)
1️⃣ Clone the Repository
git clone https://github.com/RizakSingh/Enhanso-Ai-Image-Enhancer-.git
cd Enhanso-Ai-Image-Enhancer-

2️⃣ Backend Setup
cd backend
npm install
npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🧪 API Overview
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
POST	/api/auth/forgot-password	Password reset link
POST	/api/process	AI image processing
GET	/api/images	Fetch user images
🚀 Deployment Notes

Backend deployed on Render (Free Tier)

Initial request may experience cold start delay.

Frontend deployed on Vercel

MongoDB hosted on MongoDB Atlas

Environment variables configured securely in production dashboards.

🧠 What This Project Demonstrates (Interview Ready)

Real-world full-stack MERN development

Secure authentication & authorization

Third-party AI API integration

Cloud database & deployment handling

Production debugging (DNS, env vars, cold starts)

Linux vs Windows build issue handling

Clean frontend–backend separation

👨‍💻 Author

Rizak Singh
GitHub: https://github.com/RizakSingh

📜 License

This project is for educational & portfolio purposes.
