# 🎓 E-Learning Platform

A full-stack e-learning platform application built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📦 Tech Stack

| Layer     | Technology                                                                 |
|-----------|----------------------------------------------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4, React Router, TanStack Query, Zustand     |
| Backend   | Node.js, Express 5, MongoDB (Mongoose), JWT Auth, bcryptjs                 |
| Deployment| Designed to be deployable to Netlify/Vercel (Frontend) & Render (Backend)  |

---

## 🚀 Key Features

*   **JWT Authentication**: Secure user registration and login.
*   **Course Discovery**: Browse available courses in a clean marketplace layout.
*   **Student Dashboard**: View enrolled courses in one place.
*   **Course Progress Tracking**: Keep track of the learning progress visually with progress bars.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)

---

## 🖥️ Frontend Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the **root** of the project (next to `package.json`):

```env
# For local development
VITE_API_URL=http://localhost:5000/api
```

> **Note:** Vite only exposes variables prefixed with `VITE_` to the browser.

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### Other frontend scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start local dev server (HMR)       |
| `npm run build`   | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                  |

---

## 🛠️ Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend/` folder with the following variables:

```env
# MongoDB connection string (Atlas or local)
MONGODB_CONNECTION=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/elearning-db

# Server port
PORT=5000

# JWT secret key (use a long, random string in production)
JWT_SECRET=your_jwt_secret_here

# Allowed frontend origin (for CORS)
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file.**

### 4. Start the backend server

**Development (with auto-reload via nodemon):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The API will be available at **http://localhost:5000**

You can verify it's running by visiting: [http://localhost:5000](http://localhost:5000) — it should return `API is running...`

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/api/auth/register`    | Register a new user      |
| POST   | `/api/auth/login`       | Login and get JWT token  |

### Courses
| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/api/courses`          | Get all courses          |
| GET    | `/api/courses/:id`      | Get course by ID         |
| POST   | `/api/courses`          | Create a course (Admin)  |

### Enrollments (Protected via JWT)
| Method | Endpoint                            | Description                        |
|--------|-------------------------------------|------------------------------------|
| GET    | `/api/enrollments`                  | Get logged-in user's enrollments   |
| POST   | `/api/enrollments`                  | Enroll in a course                 |
| PUT    | `/api/enrollments/:id/progress`     | Update progress on an enrollment   |

---

## 📁 Project Structure

```
task/
├── backend/                  # Express API
│   ├── components/           
│   ├── controllers/          # Route controllers (Auth, Courses, Enrollments)
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose models (User, Course, Enrollment)
│   ├── routes/               # API routes
│   └── index.js              # Entry point
│
├── src/                      # React frontend
│   ├── api/                  # Axios configuration
│   ├── components/           # Reusable UI components (Navbar, CourseCard)
│   ├── pages/                # Page views (Dashboard, Courses, Login, Register)
│   └── store/                # Zustand global state (useAuthStore)
├── public/                   # Static assets
├── index.html                # HTML entry
├── vite.config.js            # Vite configuration
└── package.json              # Frontend dependencies
```
