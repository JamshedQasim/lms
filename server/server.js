import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import mongoose from 'mongoose'; // Added missing import for mongoose

// Initialize express
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow both Vite and React ports
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);

// Test endpoint - no authentication required
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    status: 'success',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'LMS API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/v1/courses',
      test: '/test',
      health: '/health'
    }
  });
});

// Port configuration
const PORT = process.env.PORT || 3001;

// Start server function
const startServer = async () => {
  try {
    console.log('🚀 Starting LMS server...');
    
    // Start the server immediately
    const server = app.listen(PORT, 'localhost', () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
    
    // Add error handling for the server
    server.on('error', (error) => {
      console.error('❌ Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.log(`💡 Port ${PORT} is already in use. Try a different port or kill the existing process.`);
      }
    });
    
    server.on('listening', () => {
      console.log(' Server is now listening for connections');
    });
    
    // Try to connect to MongoDB
    console.log(' Attempting to connect to MongoDB...');
    const dbConnected = await connectDB();
    
    if (dbConnected) {
      console.log('Server started successfully with database connection!');
    } else {
      console.log(' Server started but database connection failed');
      console.log(' Some features may not work without database connection');
    }
    
  } catch (error) {
    console.error(' Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Gracefully shutting down...');
  mongoose.connection.close(() => {
    console.log(' MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Gracefully shutting down...');
  mongoose.connection.close(() => {
    console.log(' MongoDB connection closed');
    process.exit(0);
  });
});