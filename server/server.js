import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import authRoutes from './routes/auth.js';

//initializing express
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Working!');
});

//port
const PORT = process.env.PORT || 3001;

// Start server function
const startServer = async () => {
  try {
    console.log('Starting server...');
    
    // Try to connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connected successfully');
    
    // Start the server
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
    
  } catch (error) {
    console.error('Failed to start server:', error);
    // Start server even without MongoDB for development
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
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
  }
};

// Start the server
startServer();