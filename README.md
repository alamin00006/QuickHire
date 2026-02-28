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
- Delete jobs

---

## Tech Stack

**Frontend:** Next.js / React.js, Tailwind CSS, TypeScript
**Backend:** Node.js, Express.js
**Database:** MongoDB + Mongoose
**Tools:** Git, Postman, Vercel/Render (optional)

---

## API Endpoints

**Jobs**

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `DELETE /api/jobs/:id`

**Applications**

- `POST /api/applications`

---

## 🗄 Database Models

**Job:** title, company, location, category, description
**Application:** job_id, name, email, resume_link, cover_note

---

## Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🎯 Demo & Links

- GitHub Repo: _Add link_
- Loom Demo: _Add link_
- Live Site: _Add link_

---

## Author

**Mohammad Al Amin**
Full Stack Developer

---

## Future Improvements

- Admin authentication
- Edit jobs
- Resume file upload
- Pagination & advanced filtering

---

Thanks for reviewing my project
