import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test server is working!', 
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Simple auth test endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Simple mock authentication for testing
  if (email === 'test@example.com' && password === 'password123') {
    res.json({
      message: 'Login successful',
      token: 'test-token-123',
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student'
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
  }
});

// Simple signup test endpoint
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  
  // Simple mock user creation for testing
  res.status(201).json({
    message: 'User created successfully',
    token: 'test-token-' + Date.now(),
    user: {
      id: 'user-' + Date.now(),
      name,
      email,
      role: role || 'student'
    }
  });
});

// Simple logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Simple courses endpoint
app.get('/api/v1/courses', (req, res) => {
  const mockCourses = [
    {
      _id: 'course-1',
      title: 'Web Development Basics',
      description: 'Learn the fundamentals of web development',
      category: 'Web Development',
      level: 'Beginner',
      price: 49.99,
      instructorId: 'instructor-1',
      instructorName: 'John Doe',
      status: 'published',
      enrolledStudents: 150,
      rating: 4.5
    },
    {
      _id: 'course-2',
      title: 'Advanced JavaScript',
      description: 'Master modern JavaScript concepts',
      category: 'Programming',
      level: 'Advanced',
      price: 79.99,
      instructorId: 'instructor-2',
      instructorName: 'Jane Smith',
      status: 'published',
      enrolledStudents: 89,
      rating: 4.8
    }
  ];
  
  res.json({ courses: mockCourses });
});

// Simple enrolled courses endpoint
app.get('/api/v1/courses/enrolled', (req, res) => {
  const mockEnrolledCourses = [
    {
      _id: 'course-1',
      title: 'Web Development Basics',
      description: 'Learn the fundamentals of web development',
      category: 'Web Development',
      level: 'Beginner',
      price: 49.99
    }
  ];
  
  res.json({ courses: mockEnrolledCourses });
});

// Simple instructor courses endpoint
app.get('/api/v1/courses/instructor', (req, res) => {
  const mockInstructorCourses = [
    {
      _id: 'course-3',
      title: 'React Fundamentals',
      description: 'Learn React from scratch',
      category: 'Web Development',
      level: 'Intermediate',
      price: 69.99,
      status: 'draft',
      enrolledStudents: 45,
      rating: 4.6
    }
  ];
  
  res.json({ courses: mockInstructorCourses });
});

// Simple enrollment endpoint
app.post('/api/v1/courses/:id/enroll', (req, res) => {
  const { id } = req.params;
  
  res.json({
    message: 'Successfully enrolled in course',
    courseId: id,
    enrolledAt: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📝 Test endpoints available:`);
  console.log(`   GET  /test - Server status`);
  console.log(`   POST /api/auth/login - Test login`);
  console.log(`   POST /api/auth/signup - Test signup`);
  console.log(`   POST /api/auth/logout - Test logout`);
  console.log(`   GET  /api/v1/courses - Test courses`);
  console.log(`   GET  /api/v1/courses/enrolled - Test enrolled courses`);
  console.log(`   GET  /api/v1/courses/instructor - Test instructor courses`);
  console.log(`   POST /api/v1/courses/:id/enroll - Test enrollment`);
  console.log(`\n💡 Test login: test@example.com / password123`);
});

// Error handling
app.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down test server...');
  process.exit(0);
});
