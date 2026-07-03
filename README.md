<div align="center">

# 🎓 Preppy — Study smarter with AI

**Turn your documents into an AI-powered study space.** Upload a PDF and Preppy builds
summaries, flashcards, and quizzes around it, then answers your questions like a tutor
that has actually done the reading.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=for-the-badge)](https://preppy-2dzq.vercel.app)
&nbsp;
[![API](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge)](https://preppy-api-sm2k.onrender.com)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google_Gemini-8b5cf6?logo=google&logoColor=white)

</div>

---

## 🔗 Live

| | URL |
|---|---|
| **Web app** | https://preppy-2dzq.vercel.app |
| **API** | https://preppy-api-sm2k.onrender.com |

> ℹ️ The API runs on a free tier that sleeps after ~15 minutes of inactivity, so the
> **first request may take 30–60 seconds** to wake up. It's instant after that.

---

## ✨ Features

- **📄 Document workspace** — Upload PDFs; they're parsed and stored per user, with an in-app PDF viewer.
- **📝 AI summaries** — Generate a clear, structured summary of an entire document.
- **💡 Explain a concept** — Ask Preppy to explain any topic from the document in plain language, with examples.
- **💬 Chat with your notes** — Ask questions and get answers grounded in the document's content.
- **📚 Smart flashcards** — Auto-generated Q/A cards with difficulty levels, starring, and review tracking.
- **🧠 Adaptive quizzes** — Generate multiple-choice quizzes, take them, and get detailed, explained results.
- **📊 Dashboard** — Track totals and recent activity across documents, flashcards, and quizzes.
- **🔐 Auth & privacy** — JWT-based auth; each user's library and data are isolated.
- **🎨 Polished UI** — Clean, Apple-inspired design, a 3D CSS graduation-cap landing page, and a **light/dark mode** toggle.

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite 7
- Tailwind CSS v4 (token-based design system, light/dark theme)
- React Router 7, Axios, React Hot Toast
- lucide-react (icons), react-markdown + remark-gfm + react-syntax-highlighter

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) + `bcryptjs` for auth
- `multer` (PDF uploads) + `pdf-parse` (text extraction)
- `@google/genai` — Google **Gemini** (with automatic retry/backoff and model fallback)
- `express-validator`, `cors`, `dotenv`

**Hosting**
- Frontend → **Vercel** · Backend → **Render** · Database → **MongoDB Atlas**

---

## 📂 Project Structure

```
Preppy/
├── frontend/                 # React + Vite client
│   ├── src/
│   │   ├── components/        # UI, layout, feature components (+ 3D landing cap)
│   │   ├── context/          # Auth & Theme providers
│   │   ├── pages/            # Landing, Auth, Dashboard, Documents, Flashcards, Quizzes, Profile
│   │   ├── services/         # API service modules
│   │   ├── utils/            # axios instance, API paths
│   │   └── index.css         # Design tokens + dark mode
│   └── vercel.json           # SPA routing rewrites
├── backend/                  # Express API
│   ├── config/               # db + multer config
│   ├── controllers/          # route handlers
│   ├── middleware/           # auth, error handling
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── utils/                # geminiService (AI calls)
│   └── server.js             # app entry
└── render.yaml               # Render deployment blueprint
```

---

## 🚀 Getting Started (run it on your machine)

### Prerequisites
- **Node.js 18+** and npm
- A **MongoDB** database — a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works great
- A **Google Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone
```bash
git clone https://github.com/AKhshAT10/Preppy.git
cd Preppy
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env      # then edit .env with your values (see table below)
npm run dev               # starts on http://localhost:8000
```

### 3. Frontend (in a second terminal)
```bash
cd frontend
npm install
# .env already points at the local backend by default:
#   VITE_API_URL=http://localhost:8000
npm run dev               # starts on http://localhost:5173
```

### 4. Open
Visit **http://localhost:5173**, create an account, upload a PDF, and start studying.

> Start the **backend first** so the API is ready when the frontend loads, and make sure
> your `MONGODB_URI` points at a reachable database.

---

## 🔑 Environment Variables

### `backend/.env`
| Variable | Required | Description |
|---|:---:|---|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Long random string for signing tokens |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `JWT_EXPIRE` | | Token lifetime (default `30d`) |
| `GEMINI_MODEL` | | Comma-separated model fallback order (default `gemini-2.5-flash,gemini-2.0-flash`) |
| `MAX_FILE_SIZE` | | Max upload size in bytes (default `52428800` = 50 MB) |
| `PORT` | | Server port (default `8000`) |
| `NODE_ENV` | | `development` or `production` |
| `SERVER_URL` | | Public URL of the backend, used to build uploaded-file links (prod only) |
| `CLIENT_URL` | | Allowed frontend origin(s) for CORS, comma-separated. `*` allows any (prod only) |

### `frontend/.env`
| Variable | Required | Description |
|---|:---:|---|
| `VITE_API_URL` | ✅ | Base URL of the backend API (e.g. `http://localhost:8000`) |

> 🔒 `.env` files are git-ignored — **never commit real secrets.** Only `.env.example`
> (with placeholders) is tracked.

---

## 📡 API Overview

All protected routes require an `Authorization: Bearer <token>` header.

| Group | Base path | Purpose |
|---|---|---|
| Auth | `/api/auth` | Register, login, profile, change password |
| Documents | `/api/documents` | Upload, list, fetch, update, delete PDFs |
| AI | `/api/aiRoutes` | Summaries, explanations, chat, generate flashcards/quizzes |
| Flashcards | `/api/flashcards` | List sets, review, star, delete |
| Quizzes | `/api/quizzes` | Fetch, submit, results, delete |
| Progress | `/api/progress` | Dashboard stats & recent activity |
| Health | `/` | Service status check |

---

## 📦 Scripts

**Backend** (`/backend`)
| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start the server |

**Frontend** (`/frontend`)
| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## ☁️ Deployment

The app is split into a static frontend and a Node API.

**Backend → Render**
1. In MongoDB Atlas → **Network Access**, allow `0.0.0.0/0` (hosts have no fixed IP).
2. On Render → **New → Blueprint**, point it at this repo (it reads `render.yaml`).
3. Fill the secret env vars (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`), plus
   `SERVER_URL` (the service's own URL) and `CLIENT_URL` (your frontend URL).

**Frontend → Vercel**
1. Import the repo and set **Root Directory = `frontend`** (Vite is auto-detected).
2. Add env var `VITE_API_URL` = your Render backend URL, then deploy.
3. Set the backend's `CLIENT_URL` to your Vercel URL so CORS allows it.

> ⚠️ On free hosting, uploaded PDFs are stored on ephemeral disk and are cleared on
> restart/redeploy. For durable storage, wire uploads to Cloudinary or S3.

---

## 🗺️ Roadmap

- [ ] Persistent file storage (Cloudinary / S3)
- [ ] Spaced-repetition scheduling for flashcards
- [ ] Support for more file types (DOCX, TXT, images)
- [ ] Shareable study sets

---

## 👤 Author

**Akhshat Sharma** — [@AKhshAT10](https://github.com/AKhshAT10)

## 📄 License

Released under the **MIT License**. Feel free to use and adapt.
