import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student', 'instructor', 'admin'], 
        default: 'student' 
    },
    bio: { type: String },
    enrolledCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],
    wishlist: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],
    completedCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],
    lessonProgress: {
        type: Map,
        of: {
            percent: { type: Number, default: 0 },
            lastWatchedSec: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
            lastUpdated: { type: Date, default: Date.now }
        }
    },
    // Password reset fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // OAuth fields
    oauth: {
        google: { id: String, email: String },
        github: { id: String, email: String }
    },
    // Profile fields
    phone: String,
    location: String,
    website: String,
    socialLinks: {
        linkedin: String,
        twitter: String,
        youtube: String
    },
    preferences: {
        emailNotifications: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: true },
        language: { type: String, default: 'English' },
        timezone: { type: String, default: 'UTC' }
    }
}, { timestamps: true });

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'oauth.google.id': 1 });
userSchema.index({ 'oauth.github.id': 1 });

const User = mongoose.model('User', userSchema);
export default User;

