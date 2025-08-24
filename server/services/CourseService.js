import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Lesson from '../models/Lesson.js';

class CourseService {
  // Create new course
  async createCourse(courseData) {
    try {
      const course = new Course({
        ...courseData,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await course.save();
      return course;
    } catch (error) {
      throw error;
    }
  }

  // Get all courses with filters
  async getCourses(filters = {}) {
    try {
      const {
        search,
        category,
        level,
        priceMin,
        priceMax,
        sort = 'createdAt',
        order = 'desc',
        page = 1,
        limit = 10
      } = filters;

      let query = { status: 'published' };

      // Search filter
      if (search) {
        query.$text = { $search: search };
      }

      // Category filter
      if (category) {
        query.category = category;
      }

      // Level filter
      if (level) {
        query.level = level;
      }

      // Price range filter
      if (priceMin !== undefined || priceMax !== undefined) {
        query.price = {};
        if (priceMin !== undefined) query.price.$gte = priceMin;
        if (priceMax !== undefined) query.price.$lte = priceMax;
      }

      const sortObj = {};
      sortObj[sort] = order === 'desc' ? -1 : 1;

      const courses = await Course.find(query)
        .populate('instructorId', 'name email imageUrl')
        .sort(sortObj)
        .limit(limit)
        .skip((page - 1) * limit);

      const total = await Course.countDocuments(query);

      return {
        courses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Get course by slug
  async getCourseBySlug(slug) {
    try {
      const course = await Course.findOne({ slug, status: 'published' })
        .populate('instructorId', 'name email imageUrl bio')
        .populate('modules');

      if (!course) {
        throw new Error('Course not found');
      }

      return course;
    } catch (error) {
      throw error;
    }
  }

  // Get courses by instructor ID
  async getInstructorCourses(instructorId) {
    try {
      const courses = await Course.find({ instructorId })
        .populate('instructorId', 'name email imageUrl')
        .sort({ createdAt: -1 });

      return courses;
    } catch (error) {
      throw error;
    }
  }

  // Get course modules
  async getCourseModules(courseId) {
    try {
      const modules = await Module.find({ courseId })
        .populate('lessons')
        .sort('order');

      return modules;
    } catch (error) {
      throw error;
    }
  }

  // Get lesson content
  async getLessonContent(lessonId, userId) {
    try {
      const lesson = await Lesson.findById(lessonId)
        .populate('moduleId');

      if (!lesson) {
        throw new Error('Lesson not found');
      }

      // Check if user is enrolled in the course
      // This would typically check enrollment status
      const isEnrolled = true; // Placeholder - implement enrollment check

      if (!isEnrolled && !lesson.isFreePreview) {
        throw new Error('Lesson requires enrollment');
      }

      return lesson;
    } catch (error) {
      throw error;
    }
  }

  // Update course
  async updateCourse(courseId, updateData) {
    try {
      const course = await Course.findByIdAndUpdate(
        courseId,
        { 
          ...updateData,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );

      if (!course) {
        throw new Error('Course not found');
      }

      return course;
    } catch (error) {
      throw error;
    }
  }

  // Delete course
  async deleteCourse(courseId) {
    try {
      const course = await Course.findByIdAndDelete(courseId);
      
      if (!course) {
        throw new Error('Course not found');
      }

      // Also delete related modules and lessons
      await Module.deleteMany({ courseId });
      await Lesson.deleteMany({ moduleId: { $in: course.modules } });

      return course;
    } catch (error) {
      throw error;
    }
  }

  // Get course statistics
  async getCourseStats(courseId) {
    try {
      const course = await Course.findById(courseId);
      const moduleCount = await Module.countDocuments({ courseId });
      const lessonCount = await Lesson.countDocuments({ 
        moduleId: { $in: course.modules } 
      });

      return {
        moduleCount,
        lessonCount,
        totalDuration: course.totalDuration || 0
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new CourseService();
