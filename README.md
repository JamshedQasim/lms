# 🎓 LMS (Learning Management System)

A full-stack learning management system built with React (Vite), Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)

### 1. Start MongoDB (Windows)
```bash
net start MongoDB
```

### 2. Start Backend Server
```bash
cd server
node server.js
```

### 3. Start Frontend (in new terminal)
```bash
cd client
npm run dev
```

## 🌐 Access URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📁 Project Structure
```
├── client/          # React frontend (Vite)
├── server/          # Node.js backend
│   ├── configs/     # Database configuration
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API endpoints
│   ├── services/    # Business logic
│   └── middleware/  # Authentication & validation
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
1. Make sure MongoDB service is running
2. Check if port 27017 is available
3. Try using `127.0.0.1` instead of `localhost`

### Port Issues
- Backend: 3001
- Frontend: 5173 (Vite default)
- MongoDB: 27017

### Common Commands
```bash
# Check MongoDB status
netstat -an | findstr 27017

# Kill process on port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

## 📝 Features
- ✅ User authentication (signup/login)
- ✅ Role-based access (student/instructor)
- ✅ Course management
- ✅ User enrollment
- ✅ Progress tracking
- ✅ JWT authentication
- ✅ MongoDB integration
