import mongoose from "mongoose";

//connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection successful");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    await mongoose.connect(`${mongoURI}/lms`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // For development, continue without MongoDB
    console.log("Continuing without MongoDB connection...");
  }
};

export default connectDB;