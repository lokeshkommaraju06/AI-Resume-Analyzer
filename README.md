# AI Resume Analyzer 📄✨

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-resume-analyzer-cyan-eight.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://ai-resume-analyzer-api-jpzd.onrender.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://aistudio.google.com)

An intelligent, full-stack **Applicant Tracking System (ATS) Resume Analyzer** built with the MERN stack and Google Gemini AI. 

Upload your resume in PDF format, paste your target job description, and instantly receive comprehensive ATS scoring, keyword match analysis, identified skill gaps, and actionable recommendations to optimize your chances of landing interviews.

---

## 🌐 Live Links

- **🚀 Live Application:** [https://ai-resume-analyzer-cyan-eight.vercel.app](https://ai-resume-analyzer-cyan-eight.vercel.app)
- **🔌 Backend API:** [https://ai-resume-analyzer-api-jpzd.onrender.com](https://ai-resume-analyzer-api-jpzd.onrender.com)
- **📁 GitHub Repository:** [https://github.com/lokeshkommaraju06/AI-Resume-Analyzer](https://github.com/lokeshkommaraju06/AI-Resume-Analyzer)

---

## ✨ Features

- 📑 **In-Memory PDF Parsing:** Securely process PDF resumes up to 5MB directly in memory without persistent disk writes.
- 🎯 **ATS Match Scoring:** Calculate a quantified percentage match against job requirements.
- 🔍 **Keyword & Skill Gap Detection:** Highlights both missing domain skills and critical job-specific keywords.
- 💡 **Actionable Improvements:** Step-by-step guidance on formatting, grammar, and content alignment.
- 📊 **Strengths & Weaknesses Breakdown:** Clear categorization of resume highlights and areas needing polish.
- 🗄️ **Persistent History Dashboard:** Stores past analyses in MongoDB Atlas for quick review and comparison.
- 🎨 **Pure CSS3 Design:** Crafted with modern CSS3 variables, Flexbox, and CSS Grid (no external CSS framework overhead).

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Routing:** React Router v7
- **Styling:** Pure CSS3 (Flexbox, CSS Grid, Custom Variables, Responsive Media Queries)
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Deployment:** Vercel (with SPA route rewrites)

### Backend
- **Runtime:** Node.js & Express.js
- **File Uploads:** Multer (`memoryStorage`)
- **PDF Extraction:** `pdf-parse`
- **Database:** MongoDB Atlas with Mongoose ODM
- **AI Engine:** Google Gemini API (`@google/genai` SDK)
- **Deployment:** Render (Node.js Web Service)

---

## 🏛️ Architecture Workflow

```
[ Candidate PDF + Job Description ]
                 │
                 ▼
         [ React Frontend ]
                 │ (Multipart Form Data via Axios)
                 ▼
       [ Express.js Backend ]
                 │
                 ├─► [ Multer Memory Buffer ] ──► [ pdf-parse ] (Extracts Text)
                 │
                 ├─► [ Google Gemini AI ] (Evaluates ATS Fit & Generates JSON)
                 │
                 ├─► [ MongoDB Atlas ] (Saves Analysis Record)
                 │
                 ▼
       [ Visual Result Dashboard ]
```

---

## 📁 Project Structure

```text
AI-Resume-Analyzer/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI (Navbar, Footer, ScoreCard, Cards)
│   │   ├── pages/              # Home, Analyzer, History
│   │   ├── services/           # Axios API service (api.js)
│   │   ├── App.jsx             # React Router Layout
│   │   ├── index.css           # Pure CSS3 styles (Variables, Flexbox, Grid)
│   │   └── main.jsx            # React root mount
│   ├── vercel.json             # Vercel SPA routing configuration
│   ├── .env                    # Frontend environment variables
│   └── package.json
├── server/                     # Express Backend
│   ├── controllers/            # Controller logic (resumeController.js)
│   ├── middleware/             # Multer upload configuration (in-memory)
│   ├── models/                 # Mongoose Schema (Resume.js)
│   ├── routes/                 # API endpoints (api.js)
│   ├── services/               # Gemini AI prompt integration (geminiService.js)
│   ├── .env                    # Backend environment variables
│   ├── index.js                # Server entry point & health check
│   └── package.json
├── render.yaml                 # Render infrastructure configuration
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check and server status |
| `POST` | `/api/analyze` | Uploads PDF resume + job description for AI evaluation |
| `GET` | `/api/history` | Fetches all previous resume analyses |
| `GET` | `/api/history/:id` | Fetches specific resume analysis by ID |
| `DELETE` | `/api/history/:id` | Deletes an analysis record from database |

---

## 💻 Local Setup & Development

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Google AI Studio API Key](https://aistudio.google.com/app/apikey)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
In a new terminal:
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👤 Author

- **GitHub:** [@lokeshkommaraju06](https://github.com/lokeshkommaraju06)
- **Project:** [AI-Resume-Analyzer](https://github.com/lokeshkommaraju06/AI-Resume-Analyzer)
