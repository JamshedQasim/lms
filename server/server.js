import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import mongoose from "mongoose";

// Initialize express
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // frontend ports
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);

// Test endpoint
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "LMS API Server",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      courses: "/api/v1/courses",
      test: "/test",
      health: "/health",
    },
  });
});

// Server Port
const PORT = process.env.PORT || 3001;

// Start server
const startServer = async () => {
  try {
    console.log("🚀 Starting LMS server...");

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    server.on("error", (error) => {
      console.error("❌ Server error:", error.message);
    });

    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    const dbConnected = await connectDB();

    if (dbConnected) {
      console.log("✅ Server started with database connection");
    } else {
      console.log("⚠️ Server started but database connection failed");
    }
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received. Closing...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Closing...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  });
});
