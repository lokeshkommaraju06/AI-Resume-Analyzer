# AI Resume Analyzer

An intelligent, AI-powered Applicant Tracking System (ATS) Resume Analyzer. This full-stack application allows users to upload their resumes in PDF format, compare them against specific job descriptions, and receive detailed feedback powered by Google Gemini.

## Features

- **Resume Upload:** Upload PDF resumes (up to 5MB, processed in-memory).
- **AI Analysis:** Get an ATS score, strengths, weaknesses, and a summary.
- **Keyword Matching:** Identify missing skills and keywords based on the job description.
- **Actionable Suggestions:** Receive AI-generated suggestions for grammar, formatting, and overall improvement.
- **History Dashboard:** View and manage your previous analyses.
- **Modern Responsive UI:** Built with React and pure CSS3 (Flexbox & CSS Grid, no external CSS frameworks).

## Tech Stack

- **Frontend:** React, React Router, CSS3 (Custom Variables, Flexbox, Grid), Axios, Lucide React (Icons), Vite
- **Backend:** Node.js, Express.js, Multer (Memory Storage), pdf-parse (Text extraction)
- **Database:** MongoDB, Mongoose
- **AI Integration:** Google Gemini API

## Project Structure

```text
AI-Resume-Analyzer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (Home, Analyzer, History)
│   │   ├── services/       # API integration (Axios)
│   │   ├── App.jsx         # Routing & Main Layout
│   │   └── index.css       # Pure CSS3 styles (Variables, Flexbox, Grid)
│   ├── vercel.json         # Vercel deployment SPA rewrite config
│   ├── .env                # Frontend environment variables
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend
│   ├── controllers/        # Route logic and AI integration
│   ├── middleware/         # Multer configuration (in-memory PDF buffer)
│   ├── models/             # MongoDB Schemas (Mongoose)
│   ├── routes/             # Express API routes
│   ├── services/           # Gemini AI service functions
│   ├── .env                # Backend environment variables
│   ├── index.js            # Express server entry point
│   └── package.json        # Backend dependencies
├── render.yaml             # Render deployment configuration
└── README.md
```

## Setup & Local Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance
- [Google AI Studio API Key](https://aistudio.google.com/app/apikey)

### 2. Backend Setup
```bash
cd server
npm install
```

Configure Environment Variables (`server/.env`):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```

Configure Environment Variables (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Frontend Server:
```bash
npm run dev
```

---

## Complete Deployment Guide

### A. Deploy Backend to Render (Free)
1. Push your repository to **GitHub**.
2. Go to [Render.com](https://render.com) and log in.
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Configure the following settings:
   - **Name:** `ai-resume-analyzer-api`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. In **Environment Variables**, add:
   - `MONGODB_URI` = *(Your MongoDB Atlas connection URI)*
   - `GEMINI_API_KEY` = *(Your Google Gemini API Key)*
7. Click **Create Web Service**. Once deployed, copy your backend URL (e.g., `https://ai-resume-analyzer-api.onrender.com`).

---

### B. Deploy Frontend to Vercel (Free)
1. Go to [Vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New** -> **Project** and select your repository.
3. Configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click `Edit` and select `client`.
4. In **Environment Variables**, add:
   - `VITE_API_URL` = `https://<your-render-backend-url>.onrender.com/api`
5. Click **Deploy**.
6. Your live app is now online at `https://<your-app-name>.vercel.app`!
