import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use 127.0.0.1 instead of localhost for Windows compatibility
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
    
    // Set mongoose options for better compatibility (removed outdated options)
    const options = {
      dbName: 'lms',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    };

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection successful");
    });

    mongoose.connection.on("error", (err) => {
      console.error(" MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log(" MongoDB disconnected");
    });

    await mongoose.connect(mongoURI, options);
    console.log(" Connected to MongoDB successfully");
    return true;
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    console.log(" Please make sure MongoDB is running on your system");
    console.log(" On Windows, try: net start MongoDB");
    return false;
  }
};

export default connectDB;