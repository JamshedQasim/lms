import mongoose from "mongoose";
//connect to MongoDB
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connection successful");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/lms`)

};
export default connectDB;