import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  courseId: { type: String, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  lessons: [{ type: String, ref: 'Lesson' }],
  duration: { type: Number, default: 0 }, // in minutes
  isPublished: { type: Boolean, default: false },
  releaseAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes for performance
moduleSchema.index({ courseId: 1, order: 1 });
moduleSchema.index({ courseId: 1, isPublished: 1 });

const Module = mongoose.model('Module', moduleSchema);
export default Module;
