const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Simple server is working!', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Simple courses endpoint
app.get('/courses', (req, res) => {
  res.json({
    message: 'Courses endpoint working!',
    courses: [
      {
        _id: '1',
        title: 'Complete Web Development Bootcamp',
        description: 'Learn web development from scratch',
        category: 'Web Development',
        level: 'Beginner',
        price: 89.99,
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
        totalDuration: 1200,
        enrolledStudents: 1250,
        rating: 4.8
      },
      {
        _id: '2',
        title: 'Advanced JavaScript',
        description: 'Master modern JavaScript',
        category: 'Programming',
        level: 'Advanced',
        price: 69.99,
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d11b3a35?w=400',
        totalDuration: 900,
        enrolledStudents: 680,
        rating: 4.9
      },
      {
        _id: '3',
        title: 'Data Science with Python',
        description: 'Learn data science fundamentals',
        category: 'Data Science',
        level: 'Intermediate',
        price: 79.99,
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        totalDuration: 1500,
        enrolledStudents: 920,
        rating: 4.7
      }
    ]
  });
});

// Enrolled courses endpoint
app.get('/enrolled', (req, res) => {
  res.json({
    message: 'Enrolled courses endpoint working!',
    courses: []
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`📡 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`📚 Courses endpoint: http://localhost:${PORT}/courses`);
  console.log(`🎓 Enrolled endpoint: http://localhost:${PORT}/enrolled`);
});

console.log('Simple server started successfully!');
