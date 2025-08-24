import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Module from './models/Module.js';
import Lesson from './models/Lesson.js';
import User from './models/User.js';

dotenv.config();

const sampleCourses = [
  {
    title: 'Complete Web Development Bootcamp',
    slug: 'complete-web-development-bootcamp',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    language: 'English',
    level: 'Beginner',
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
    status: 'published',
    totalDuration: 1200,
    enrolledStudents: 1250,
    rating: 4.8,
    reviewCount: 89,
    prerequisites: ['Basic computer knowledge', 'Willingness to learn'],
    learningOutcomes: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Create dynamic web applications with React',
      'Develop backend APIs with Node.js and Express',
      'Work with MongoDB database',
      'Deploy applications to the web'
    ],
    requirements: ['Computer with internet connection', 'Code editor (VS Code recommended)'],
    targetAudience: ['Beginners in programming', 'Students wanting to learn web development', 'Career changers'],
    certificateIncluded: true,
    lifetimeAccess: true
  },
  {
    title: 'Advanced JavaScript: From ES6+ to Expert',
    slug: 'advanced-javascript-es6-expert',
    description: 'Master modern JavaScript with ES6+ features, async programming, design patterns, and advanced concepts. Perfect for developers wanting to level up their JS skills.',
    category: 'Programming',
    tags: ['JavaScript', 'ES6+', 'Async Programming', 'Design Patterns', 'Advanced Concepts'],
    language: 'English',
    level: 'Advanced',
    price: 69.99,
    originalPrice: 149.99,
    discount: 53,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d11b3a35?w=400',
    status: 'published',
    totalDuration: 900,
    enrolledStudents: 680,
    rating: 4.9,
    reviewCount: 156,
    prerequisites: ['Basic JavaScript knowledge', 'Understanding of programming concepts'],
    learningOutcomes: [
      'Master ES6+ features and syntax',
      'Understand async programming with Promises and async/await',
      'Learn advanced design patterns',
      'Work with modules and bundlers',
      'Debug and optimize JavaScript code'
    ],
    requirements: ['JavaScript fundamentals', 'Code editor', 'Node.js installed'],
    targetAudience: ['JavaScript developers', 'Frontend developers', 'Full-stack developers'],
    certificateIncluded: true,
    lifetimeAccess: true
  },
  {
    title: 'Data Science Fundamentals with Python',
    slug: 'data-science-fundamentals-python',
    description: 'Learn data science from the ground up using Python. Cover statistics, machine learning, data visualization, and real-world data analysis projects.',
    category: 'Data Science',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Statistics', 'Data Visualization'],
    language: 'English',
    level: 'Intermediate',
    price: 79.99,
    originalPrice: 179.99,
    discount: 56,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    status: 'published',
    totalDuration: 1500,
    enrolledStudents: 920,
    rating: 4.7,
    reviewCount: 203,
    prerequisites: ['Basic Python programming', 'High school mathematics'],
    learningOutcomes: [
      'Understand fundamental statistics and probability',
      'Clean and preprocess data effectively',
      'Create compelling data visualizations',
      'Build basic machine learning models',
      'Perform exploratory data analysis'
    ],
    requirements: ['Python 3.7+', 'Jupyter Notebook', 'Basic math knowledge'],
    targetAudience: ['Python developers', 'Students in STEM fields', 'Business analysts'],
    certificateIncluded: true,
    lifetimeAccess: true
  }
];

const seedCourses = async () => {
  try {
    console.log('🌱 Starting course seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('✅ Connected to MongoDB');

    // Create a sample instructor user if it doesn't exist
    let instructor = await User.findOne({ role: 'instructor' });
    if (!instructor) {
      instructor = new User({
        name: 'John Doe',
        email: 'instructor@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        role: 'instructor',
        bio: 'Experienced web developer and instructor with 10+ years of experience'
      });
      await instructor.save();
      console.log('✅ Created sample instructor user');
    }

    // Add instructor ID to courses
    const coursesWithInstructor = sampleCourses.map(course => ({
      ...course,
      instructorId: instructor._id
    }));

    // Clear existing courses
    await Course.deleteMany({});
    console.log('🧹 Cleared existing courses');

    // Insert courses
    const createdCourses = await Course.insertMany(coursesWithInstructor);
    console.log(`✅ Created ${createdCourses.length} courses`);

    console.log('🎉 Course seeding completed successfully!');
    console.log('📚 Sample courses available:');
    createdCourses.forEach(course => {
      console.log(`   - ${course.title} (${course.category}, ${course.level})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Course seeding failed:', error);
    process.exit(1);
  }
};

seedCourses();
