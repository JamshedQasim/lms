import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  language: { type: String, default: 'English' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  thumbnailUrl: { type: String, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
  totalDuration: { type: Number, default: 0 }, // in minutes
  enrolledStudents: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  prerequisites: [{ type: String }],
  learningOutcomes: [{ type: String }],
  requirements: [{ type: String }],
  targetAudience: [{ type: String }],
  certificateIncluded: { type: Boolean, default: true },
  lifetimeAccess: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Text index for search functionality
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Compound indexes for performance
courseSchema.index({ status: 1, category: 1 });
courseSchema.index({ instructorId: 1, status: 1 });
courseSchema.index({ price: 1, level: 1 });

const Course = mongoose.model('Course', courseSchema);
export default Course;
