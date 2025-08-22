import express from 'express';
import corn from 'cors';
import 'dotenv/config';
import { connect } from 'mongoose';
import connectDB from './configs/mongodb.js';

//initializing express
const app = express();

//connect to MongoDB
await connectDB();
//middleware
app.use(corn());

//routes
app.get('/', (req, res) => {
  res.send('API Working!');
  app.clerkWebhook = require('./controllers/webhooks.js');
  app.use('/webhook', app.clerkWebhook);
});

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));