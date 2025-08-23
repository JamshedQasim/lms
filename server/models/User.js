import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	email: { type: String, required: true, unique: true },
	imageUrl: { type: String },
	// Password is managed by Clerk; for local auth it's stored hashed
	password: { type: String, select: false },

	enrolledCourses: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
	],
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;

