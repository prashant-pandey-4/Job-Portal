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
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Database (Local or MongoDB Atlas)
- Cloudinary Account (for media uploads)

---

### 1. Clone the Repository
```bash
git clone https://github.com/prashant-pandey-4/Job-Portal.git
cd Job-Portal
```

---

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder and add:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend development server:
   ```bash
   npm start
   ```

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/user/register` | Register new user (Student / Recruiter) |
| `POST` | `/api/v1/user/login` | Login user & set auth cookie |
| `GET`  | `/api/v1/user/logout` | Logout user & clear cookie |
| `POST` | `/api/v1/user/profile/update` | Update user profile, skills, & resume |
| `POST` | `/api/v1/company/register` | Register a new company |
| `GET`  | `/api/v1/company/get` | Get all companies created by recruiter |
| `GET`  | `/api/v1/company/get/:id` | Get specific company details |
| `PUT`  | `/api/v1/company/update/:id` | Update company information |
| `POST` | `/api/v1/job/post` | Post a new job (Recruiter only) |
| `GET`  | `/api/v1/job/get` | Fetch all open jobs |
| `GET`  | `/api/v1/job/get/:id` | Fetch specific job details |
| `GET`  | `/api/v1/application/apply/:id` | Apply for a job |
| `GET`  | `/api/v1/application/get` | Get all jobs applied by student |
| `POST` | `/api/v1/application/status/:id/update` | Update applicant status |

---

## 🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m "feat: add AmazingFeature"`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
