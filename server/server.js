import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhook } from './controllers/webhooks.js';
import authRouter from './routes/auth.js';

//initializing express
const app = express();

//connect to MongoDB
await connectDB();

//cors
app.use(cors());

// Clerk webhook must receive the raw body for signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), clerkWebhook);

// general middleware for other JSON routes (add below webhook raw parser)
app.use(express.json());

// auth routes
app.use('/api/auth', authRouter);

//routes
app.get('/', (req, res) => {
  res.send('API Working!');
});

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));