import mongoose from "mongoose";

// connect to MongoDB
const connectDB = async () => {
	try {
		const baseUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
		if (!process.env.MONGODB_URI) {
			console.warn("MONGODB_URI not set. Falling back to", baseUri);
		}

		mongoose.connection.on("connected", () => {
			console.log("MongoDB connection successful");
		});
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err.message);
		});

		await mongoose.connect(`${baseUri}/lms`);
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error.message);
	}
};

export default connectDB;