import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';

//initializing express
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send('API Working!');
});

//port
const PORT = process.env.PORT || 3001;

// Start server function
const startServer = async () => {
  try {
    console.log('Starting server...');
    
    // Start the server immediately
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
      console.log(`Server bound to all network interfaces`);
    });
    
    // Add error handling for the server
    server.on('error', (error) => {
      console.error('Server error:', error);
    });
    
    server.on('listening', () => {
      console.log('Server is now listening for connections');
    });
    
    // Try to connect to MongoDB in background (non-blocking)
    console.log('Attempting to connect to MongoDB...');
    connectDB().then(() => {
      console.log('MongoDB connected successfully');
    }).catch((error) => {
      console.error('MongoDB connection failed:', error);
      console.log('Server running without MongoDB (using in-memory storage)');
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();