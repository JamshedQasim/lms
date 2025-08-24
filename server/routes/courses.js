import express from 'express';
import CourseService from '../services/CourseService.js';
import EnrollmentService from '../services/EnrollmentService.js';
import { courseSchema } from '../middleware/validation.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication to all course routes
router.use(authenticateToken);

// GET /api/v1/courses - Get all courses with filters
router.get('/', async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      level: req.query.level,
      priceMin: req.query.priceMin ? parseFloat(req.query.priceMin) : undefined,
      priceMax: req.query.priceMax ? parseFloat(req.query.priceMax) : undefined,
      sort: req.query.sort || 'createdAt',
      order: req.query.order || 'desc',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10
    };

    const result = await CourseService.getCourses(filters);
    res.json(result);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

// GET /api/v1/courses/enrolled - Get all enrolled courses for current user
router.get('/enrolled', async (req, res) => {
  try {
    const enrolledCourses = await EnrollmentService.getUserEnrollments(req.user.userId);
    res.json({ courses: enrolledCourses });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ message: 'Failed to fetch enrolled courses' });
  }
});

// GET /api/v1/courses/instructor - Get all courses for current instructor
router.get('/instructor', authorizeRole(['instructor', 'admin']), async (req, res) => {
  try {
    const instructorCourses = await CourseService.getInstructorCourses(req.user.userId);
    res.json({ courses: instructorCourses });
  } catch (error) {
    console.error('Get instructor courses error:', error);
    res.status(500).json({ message: 'Failed to fetch instructor courses' });
  }
});

// GET /api/v1/courses/:slug - Get course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await CourseService.getCourseBySlug(req.params.slug);
    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    if (error.message === 'Course not found') {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.status(500).json({ message: 'Failed to fetch course' });
    }
  }
});

// GET /api/v1/courses/:id/modules - Get course modules
router.get('/:id/modules', async (req, res) => {
  try {
    const modules = await CourseService.getCourseModules(req.params.id);
    res.json(modules);
  } catch (error) {
    console.error('Get modules error:', error);
    res.status(500).json({ message: 'Failed to fetch modules' });
  }
});

// POST /api/v1/courses - Create new course (instructor only)
router.post('/', authorizeRole(['instructor', 'admin']), async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructorId: req.user.userId
    };

    const course = await CourseService.createCourse(courseData);
    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

// PATCH /api/v1/courses/:id - Update course (instructor only)
router.patch('/:id', authorizeRole(['instructor', 'admin']), async (req, res) => {
  try {
    const course = await CourseService.updateCourse(req.params.id, req.body);
    res.json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('Update course error:', error);
    if (error.message === 'Course not found') {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.status(500).json({ message: 'Failed to update course' });
    }
  }
});

// DELETE /api/v1/courses/:id - Delete course (instructor only)
router.delete('/:id', authorizeRole(['instructor', 'admin']), async (req, res) => {
  try {
    await CourseService.deleteCourse(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    if (error.message === 'Course not found') {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.status(500).json({ message: 'Failed to delete course' });
    }
  }
});

// POST /api/v1/courses/:id/enroll - Enroll in course
router.post('/:id/enroll', async (req, res) => {
  try {
    const result = await EnrollmentService.enrollUser(req.user.userId, req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Enrollment error:', error);
    if (error.message === 'User is already enrolled in this course') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Course not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Course is not available for enrollment') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to enroll in course' });
    }
  }
});

// DELETE /api/v1/courses/:id/enroll - Unenroll from course
router.delete('/:id/enroll', async (req, res) => {
  try {
    const result = await EnrollmentService.unenrollUser(req.user.userId, req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Unenrollment error:', error);
    res.status(500).json({ message: 'Failed to unenroll from course' });
  }
});

// GET /api/v1/courses/:id/enroll - Check enrollment status
router.get('/:id/enroll', async (req, res) => {
  try {
    const isEnrolled = await EnrollmentService.isUserEnrolled(req.user.userId, req.params.id);
    res.json({ isEnrolled });
  } catch (error) {
    console.error('Check enrollment error:', error);
    res.status(500).json({ message: 'Failed to check enrollment status' });
  }
});

// GET /api/v1/courses/:id/progress - Get user progress in course
router.get('/:id/progress', async (req, res) => {
  try {
    const progress = await EnrollmentService.getUserProgress(req.user.userId, req.params.id);
    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    if (error.message === 'User is not enrolled in this course') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to fetch progress' });
    }
  }
});

export default router;
