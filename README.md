# 💼 JobPortal — Full-Stack Job Hunt & Hiring Platform

A modern, responsive, and feature-packed Full-Stack Job Portal web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). Designed for both job seekers to discover and apply for dream jobs, and recruiters to post vacancies, manage applicant pipelines, and setup company profiles.

---

## 🌟 Key Features

### 👨‍🎓 For Candidates / Job Seekers
- 📱 **Fully Responsive UI**: Seamlessly optimized for mobile, tablet, and desktop screens with mobile drawer navigation.
- 🔍 **Interactive Job Search & Filters**: Search jobs by keywords, title, or location with dynamic filtering (Location, Industry) and quick reset.
- 🏷️ **Quick Popular Search Tags**: One-click tags for trending roles like Frontend, Backend, FullStack, React, Remote, etc.
- 📄 **Profile & Resume Management**: Update bio, contact details, dynamic skill tags, and upload resume files.
- 📊 **Candidate Dashboard**: Personalized recommendations, tracking of applied jobs, and real-time application statuses (Pending, Accepted, Rejected).
- 🔐 **Secure Authentication**: JWT-based login/signup with real-time password strength meter and password visibility toggle.

### 🏢 For Recruiters / Employers
- 🏢 **Company Profile Management**: Register and manage company profile, logo, website, and description.
- 📢 **Job Posting & Management**: Post new job openings with compensation, vacancies, required experience, and tags.
- 👥 **Applicant Tracking System (ATS)**: View all applicants for each job with their resumes, contact details, and update application status in real-time.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Shadcn UI components)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)
- **Carousels**: [Embla Carousel](https://www.embla-carousel.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens (JWT) stored in HTTP-Only Cookies + `bcryptjs`
- **Media Storage**: [Cloudinary](https://cloudinary.com/) (for profile photos & company logos)
- **File Uploads**: `multer` + `datauri`

---

## 📁 Project Structure

```bash
jobportal/
├── backend/
│   ├── controllers/         # Request handlers (auth, user, job, company, application)
│   ├── middlewares/         # Auth & multer middlewares
│   ├── models/              # Mongoose data schemas (User, Job, Company, Application)
│   ├── routes/              # Express API route endpoints
│   ├── utils/               # Database connection & Cloudinary config
│   ├── index.js             # Express server entry point
│   └── package.json
│
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── components/      # UI components (Home, Jobs, Auth, Admin, Profile)
    │   ├── hooks/           # Custom React hooks for data fetching
    │   ├── redux/           # Redux slices & store configuration
    │   ├── utils/           # API endpoints & constants
    │   ├── App.jsx          # Route declarations
    │   └── main.jsx         # Application entry
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
