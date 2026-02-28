# QuickHire - Job Board Application

A mini job board application built with React.js (Vite) for the frontend and Node.js/Express + MongoDB for the backend.

## 🚀 Features

### Frontend (React + Vite + Tailwind CSS)
- **Landing Page** - Hero, featured jobs, categories, company logos, CTA, footer
- **Job Listings Page** - Browse all jobs with search, filter by category & location
- **Job Detail Page** - Full description with "Apply Now" form (name, email, resume link, cover note)
- **Admin Panel** - Add new jobs and delete existing ones
- **Responsive** - Fully responsive design using Tailwind CSS
- **Reusable Components** - Clean component architecture

### Backend (Express.js + MongoDB + Mongoose)
- RESTful API with proper validation (express-validator)
- CRUD operations for jobs
- Application submission endpoint
- Search, filter, and pagination support

## 📁 Project Structure

```
├── src/                    # Frontend (React)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components (Index, Jobs, JobDetail, Admin)
│   ├── lib/                # API client, mock data, utilities
│   └── assets/             # Images
├── backend/                # Backend (Express.js)
│   ├── config/db.js        # MongoDB connection
│   ├── models/             # Mongoose models (Job, Application)
│   ├── routes/             # API routes (jobs, applications)
│   ├── server.js           # Express server entry
│   └── README.md           # Backend API docs
```

## 🛠️ Setup & Run

### Frontend
```bash
npm install
npm run dev
```
Runs at `http://localhost:5173`

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```
Runs at `http://localhost:5000`

### Environment Variables (Backend)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List jobs (search, filter, paginate) |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create job (Admin) |
| DELETE | `/api/jobs/:id` | Delete job (Admin) |
| POST | `/api/applications` | Submit application |
| GET | `/api/applications` | List applications (Admin) |

## 🎨 Design
UI follows the provided Figma template with matching layout, typography, colors, and spacing.

## 📦 Tech Stack
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, express-validator
