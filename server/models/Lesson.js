import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  moduleId: { type: String, ref: 'Module', required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  contentType: { 
    type: String, 
    enum: ['video', 'pdf', 'html', 'quiz', 'assignment'], 
    required: true 
  },
  contentUrl: { type: String },
  contentRef: { type: String }, // For external content references
  duration: { type: Number, default: 0 }, // in seconds
  resources: [{ 
    title: String,
    type: String,
    url: String,
    size: Number
  }],
  isFreePreview: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  releaseAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes for performance
lessonSchema.index({ moduleId: 1, order: 1 });
lessonSchema.index({ moduleId: 1, isPublished: 1 });
lessonSchema.index({ contentType: 1 });

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
