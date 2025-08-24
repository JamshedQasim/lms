# 🔧 LMS Troubleshooting Guide

## 🚨 "Failed to Fetch" Error Resolution

### **Problem**: Users cannot login/signup as students or instructors, getting "Failed to fetch" errors

### **Root Cause**: Backend server is not running or not accessible

---

## 🚀 **Solution 1: Use Test Server (Recommended for Testing)**

### **Step 1: Start the Test Server**
```bash
cd server
node test-server.js
```

**Expected Output:**
```
🚀 Test server running on http://localhost:3001
📝 Test endpoints available:
   GET  /test - Server status
   POST /api/auth/login - Test login
   POST /api/auth/signup - Test signup
   POST /api/auth/logout - Test logout
   GET  /api/v1/courses - Test courses
   GET  /api/v1/courses/enrolled - Test enrolled courses
   GET  /api/v1/courses/instructor - Test instructor courses
   POST /api/v1/courses/:id/enroll - Test enrollment

💡 Test login: test@example.com / password123
```

### **Step 2: Test the Server**
Open a new terminal and test:
```bash
curl http://localhost:3001/test
```

**Expected Response:**
```json
{
  "message": "Test server is working!",
  "timestamp": "2024-01-XX...",
  "status": "success"
}
```

### **Step 3: Test Frontend**
1. Open your frontend in the browser
2. Try to signup with any email/password
3. Try to login with: `test@example.com` / `password123`

---

## 🔧 **Solution 2: Fix Main Server**

### **Step 1: Check MongoDB**
Make sure MongoDB is running:
```bash
# Windows (if installed as service)
net start MongoDB

# Or check if MongoDB is running on port 27017
netstat -an | findstr 27017
```

### **Step 2: Create Environment File**
Create `server/.env` file with:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your-super-secret-jwt-key-2024
NODE_ENV=development
```

### **Step 3: Start Main Server**
```bash
cd server
npm start
```

---

## 🧪 **Testing the System**

### **Test User Accounts**

#### **Student Account:**
- **Email**: `student@test.com`
- **Password**: `password123`
- **Role**: Student

#### **Instructor Account:**
- **Email**: `instructor@test.com`
- **Password**: `password123`
- **Role**: Instructor

### **Test Workflow**

1. **Signup as Student:**
   - Go to `/signup`
   - Fill in details
   - Select "Student" role
   - Submit

2. **Signup as Instructor:**
   - Go to `/signup`
   - Fill in details
   - Select "Instructor" role
   - Submit

3. **Login:**
   - Go to `/login`
   - Use credentials from signup
   - Should redirect to appropriate dashboard

4. **Test Features:**
   - **Students**: Browse courses, enroll, view "My Courses"
   - **Instructors**: Dashboard, create courses, manage content

---

## 🐛 **Common Issues & Fixes**

### **Issue 1: "Cannot connect to server"**
**Fix**: Start the backend server first
```bash
cd server
node test-server.js
```

### **Issue 2: "MongoDB connection failed"**
**Fix**: Use test server (no MongoDB required) or start MongoDB service

### **Issue 3: "Port already in use"**
**Fix**: Kill existing process or change port
```bash
# Windows - Find process using port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### **Issue 4: Frontend still shows old data**
**Fix**: Clear browser cache and localStorage
```javascript
// In browser console
localStorage.clear()
location.reload()
```

---

## 📱 **Frontend Testing**

### **Test Login Flow:**
1. Open browser to `http://localhost:3000`
2. Click "Login"
3. Use test credentials: `test@example.com` / `password123`
4. Should redirect to student dashboard

### **Test Signup Flow:**
1. Click "Signup"
2. Fill in form with any valid data
3. Select role (Student/Instructor)
4. Submit form
5. Should create account and redirect

---

## 🎯 **Expected Results**

### **✅ Working System:**
- Users can signup as students or instructors
- Users can login with their credentials
- Students see "Browse Courses" and "My Courses"
- Instructors see "Dashboard" and "Create Course"
- No "Failed to fetch" errors
- All API calls return proper responses

### **❌ Still Broken:**
- Check browser console for specific error messages
- Verify backend server is running on port 3001
- Check if CORS is properly configured
- Ensure frontend is calling correct API endpoints

---

## 🆘 **Need Help?**

If you're still getting errors:

1. **Check Browser Console** (F12) for specific error messages
2. **Check Terminal** where server is running for error logs
3. **Test API endpoints** directly with curl or Postman
4. **Verify ports** are not blocked by firewall

---

## 🚀 **Quick Start Commands**

```bash
# Terminal 1 - Start Test Server
cd server
node test-server.js

# Terminal 2 - Start Frontend (if needed)
cd client
npm start

# Terminal 3 - Test API
curl http://localhost:3001/test
```

**The test server will work immediately without any database setup!**
