# QuickHire – Simple Job Board

QuickHire is a mini full-stack job board application where users can browse jobs, view details, and apply, while admins can create and manage job listings.

---

## Features

### User

- View all jobs
- Search & filter by category/location
- Job detail page
- Apply with name, email, resume link, cover note
- Fully responsive UI

### Admin

- Add new jobs
  -Update jobs
- Delete jobs

---

## Tech Stack

**Frontend:** Next.js / React.js, Tailwind CSS, TypeScript
**Backend:** Node.js, Express.js
**Database:** MongoDB + Mongoose

---

## API Endpoints

**Jobs**

- `GET /api/v1/jobs`
- `GET /api/v1/jobs/:id`
- `PATCH /api/v1/jobs/:id`
- `POST /api/v1/jobs`
- `DELETE /api/v1/jobs/:id`

**Applications**

- `POST /api/v1/applications`

---

## 🗄 Database Models

**Job:** title, company, category, description
**Application:** job_id, name, email, resume_link, cover_note
**Location:** city, country

---

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
env
```

```code
MONGO_URI=mongodb+srv://Alamin:ZnEUylHANPiysG7L@cluster0.scp6egc.mongodb.net/Jobs?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=myAccessToken
BCRYPT_SALT_ROUNDS=12
JWT_EXPIRES_IN=7d
PORT=8000
```

### Frontend

```bash
cd client
npm install
npm run dev
env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Admin

```bash
cd admin
npm install
npm run dev
env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NODE_ENV=development
```

---

## Github Repo Links

- GitHub Repo: _[https://github.com/alamin00006/QuickHire]_

---

Thanks for reviewing my project
