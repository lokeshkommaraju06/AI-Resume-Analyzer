# AI Resume Analyzer

An intelligent, AI-powered Applicant Tracking System (ATS) Resume Analyzer. This full-stack application allows users to upload their resumes in PDF format, compare them against specific job descriptions, and receive detailed feedback powered by Google Gemini.

## Features

- **Resume Upload:** Upload PDF resumes (up to 5MB).
- **AI Analysis:** Get an ATS score, strengths, weaknesses, and a summary.
- **Keyword Matching:** Identify missing skills and keywords based on the job description.
- **Actionable Suggestions:** Receive AI-generated suggestions for grammar, formatting, and overall improvement.
- **History Dashboard:** View and manage your previous analyses.
- **Modern UI:** Built with React, Tailwind CSS, and a clean, responsive design.

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, Lucide React (Icons), Vite
- **Backend:** Node.js, Express.js, Multer (File uploads), pdf-parse (Text extraction)
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
│   │   └── index.css       # Tailwind configuration
│   ├── .env                # Frontend environment variables
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend
│   ├── controllers/        # Route logic and AI integration
│   ├── middleware/         # Multer configuration for file uploads
│   ├── models/             # MongoDB Schemas (Mongoose)
│   ├── routes/             # Express API routes
│   ├── services/           # Gemini AI service functions
│   ├── uploads/            # Temporary storage for uploaded PDFs
│   ├── .env                # Backend environment variables
│   ├── index.js            # Express server entry point
│   └── package.json        # Backend dependencies
└── README.md
```

## Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a MongoDB Atlas account
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 2. Backend Setup
```bash
cd server
npm install
```

Configure Environment Variables (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai-resume-analyzer
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window.
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

## Usage / Local Links

- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** `http://localhost:5000`

## Future Improvements

- Add User Authentication (JWT) to save history per user.
- Add support for DOCX uploads.
- Integrate a rich text editor for the job description input.
- Export analysis report as PDF.
