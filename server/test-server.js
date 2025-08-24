import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Test server is working!', timestamp: new Date().toISOString() });
});

app.get('/courses', (req, res) => {
  res.json({ 
    message: 'Courses endpoint working!',
    courses: [
      { id: 1, title: 'Test Course 1', category: 'Test' },
      { id: 2, title: 'Test Course 2', category: 'Test' }
    ]
  });
});

app.listen(PORT, 'localhost', () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
  console.log(`Courses endpoint: http://localhost:${PORT}/courses`);
});

console.log('Test server started successfully!');
