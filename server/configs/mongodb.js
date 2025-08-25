import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Use 127.0.0.1 instead of localhost for Windows compatibility
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

    const options = {
      dbName: "lms",
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });

    await mongoose.connect(mongoURI, options);
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("➡️ Please make sure MongoDB is running");
    return false;
  }
};

export default connectDB;
