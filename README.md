# Student Training and Placement Portal

A comprehensive MERN stack web application for managing student training and placement activities with Firebase authentication and MongoDB data storage.

## Features

### User Types:
1. **Students**: Profile management, resume upload, job applications, notifications
2. **Companies**: Company profile, job postings, application management
3. **College**: Dashboard for verifying companies, managing placements
4. **Admin**: User management, system configuration, analytics

### Key Features:
- Firebase Authentication for secure login/signup
- MongoDB for main data storage
- Role-based access control
- File upload capabilities (resumes, documents)
- Real-time notifications
- Analytics and reporting dashboards
- Modern UI with React, Vite, and TailwindCSS

## Tech Stack

### Backend:
- Node.js + Express.js
- MongoDB with Mongoose
- Firebase Admin SDK
- JWT for session management
- Multer for file uploads

### Frontend:
- React 18
- Vite
- TailwindCSS
- Firebase Client SDK
- React Router DOM
- Zustand for state management

## Setup Instructions

### Prerequisites:
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Firebase project with Authentication and Storage enabled

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Enable Storage
4. Get your Firebase configuration (as provided in the code)
5. Generate a private key for Admin SDK (Service Account)

### 3. Environment Configuration

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placement_portal
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-private-key-here
FIREBASE_CLIENT_EMAIL=your-client-email@project.iam.gserviceaccount.com
JWT_SECRET=your-jwt-secret-key-here
NODE_ENV=development
```

**Frontend Firebase Config (src/firebase.js):**
Update with your Firebase project configuration.

### 4. Database Setup

Start MongoDB:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud service
```

### 5. Run the Application

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication:
- `POST /api/auth/login` - User login with Firebase token
- `GET /api/auth/profile` - Get user profile

### Students:
- `GET /api/students/profile` - Get student profile
- `POST /api/students/profile` - Create/update student profile
- `GET /api/students/applications` - Get student applications

### Companies:
- `GET /api/companies/profile` - Get company profile
- `POST /api/companies/profile` - Create/update company profile
- `GET /api/companies/jobs` - Get company jobs

### Jobs:
- `GET /api/jobs` - Get all approved jobs
- `POST /api/jobs` - Create job (company)
- `POST /api/jobs/:jobId/apply` - Apply for job (student)
- `GET /api/jobs/:jobId/applications` - Get job applications (company)

### College:
- `GET /api/college/companies/pending` - Get pending companies
- `POST /api/college/companies/:companyId/verify` - Verify company
- `GET /api/college/jobs/pending` - Get pending jobs
- `POST /api/college/jobs/:jobId/approve` - Approve job
- `POST /api/college/jobs/:jobId/reject` - Reject job
- `GET /api/college/statistics` - Get placement statistics

### Admin:
- `GET /api/admin/users` - Get all users
- `GET /api/admin/companies` - Get all companies
- `GET /api/admin/students` - Get all students
- `GET /api/admin/jobs` - Get all jobs
- `GET /api/admin/statistics` - Get system statistics

## Firebase-MongoDB Integration

### Authentication Flow:
1. User signs up/login via Firebase Auth
2. Backend verifies Firebase ID token
3. Creates/updates user in MongoDB with role
4. Issues JWT for session management

### Data Storage:
- **Firebase**: Authentication only
- **MongoDB**: All application data (users, students, companies, jobs, applications)

### Connecting Frontend to Backend:
1. Frontend uses Firebase Auth for login
2. Gets Firebase ID token
3. Sends token to backend `/api/auth/login`
4. Backend verifies token and returns JWT
5. Frontend stores JWT for subsequent API calls

## Troubleshooting

### Common Issues:

1. **Firebase Authentication Error**:
   - Check Firebase project configuration
   - Verify service account credentials

2. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check connection string in .env

3. **CORS Issues**:
   - Backend includes CORS middleware
   - Frontend proxy configured in vite.config.js

4. **Environment Variables**:
   - Ensure all required env variables are set
   - Private key should be properly formatted with escaped newlines

### Development Tips:
- Use browser dev tools to check network requests
- Check backend console logs for errors
- Verify Firebase project settings in console

## Production Deployment

1. Set `NODE_ENV=production`
2. Build frontend: `npm run build`
3. Use process manager (PM2) for backend
4. Configure production MongoDB
5. Set up reverse proxy (nginx)
6. Configure SSL certificates

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

This project is for educational purposes. Please ensure proper licensing for production use.
