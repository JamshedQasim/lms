import User from '../models/User.js';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

class EnrollmentService {
  // Enroll user in a course
  async enrollUser(userId, courseId) {
    try {
      // Check if user is already enrolled
      const user = await User.findById(userId);
      if (user.enrolledCourses.includes(courseId)) {
        throw new Error('User is already enrolled in this course');
      }

      // Check if course exists and is published
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      if (course.status !== 'published') {
        throw new Error('Course is not available for enrollment');
      }

      // Add course to user's enrolled courses
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { enrolledCourses: courseId } }
      );

      // Increment course enrollment count
      await Course.findByIdAndUpdate(
        courseId,
        { $inc: { enrolledStudents: 1 } }
      );

      return { message: 'Enrollment successful' };
    } catch (error) {
      throw error;
    }
  }

  // Unenroll user from a course
  async unenrollUser(userId, courseId) {
    try {
      // Remove course from user's enrolled courses
      await User.findByIdAndUpdate(
        userId,
        { $pull: { enrolledCourses: courseId } }
      );

      // Decrement course enrollment count
      await Course.findByIdAndUpdate(
        courseId,
        { $inc: { enrolledStudents: -1 } }
      );

      return { message: 'Unenrollment successful' };
    } catch (error) {
      throw error;
    }
  }

  // Get user's enrolled courses with details
  async getUserEnrollments(userId) {
    try {
      const user = await User.findById(userId)
        .populate({
          path: 'enrolledCourses',
          populate: {
            path: 'instructorId',
            select: 'name email imageUrl bio'
          }
        })
        .select('enrolledCourses');

      return user?.enrolledCourses || [];
    } catch (error) {
      throw error;
    }
  }

  // Check if user is enrolled in a course
  async isUserEnrolled(userId, courseId) {
    try {
      const user = await User.findById(userId);
      return user.enrolledCourses.includes(courseId);
    } catch (error) {
      throw error;
    }
  }

  // Get enrollment statistics for a course
  async getCourseEnrollmentStats(courseId) {
    try {
      const course = await Course.findById(courseId);
      const enrolledUsers = await User.countDocuments({
        enrolledCourses: courseId
      });

      return {
        courseId,
        totalEnrollments: enrolledUsers,
        courseCapacity: course.maxStudents || 'Unlimited'
      };
    } catch (error) {
      throw error;
    }
  }

  // Get user's learning progress
  async getUserProgress(userId, courseId) {
    try {
      // This would typically integrate with a Progress model
      // For now, return basic enrollment info
      const isEnrolled = await this.isUserEnrolled(userId, courseId);
      
      if (!isEnrolled) {
        throw new Error('User is not enrolled in this course');
      }

      return {
        courseId,
        isEnrolled: true,
        enrolledAt: new Date(), // This would come from enrollment record
        progress: 0, // This would be calculated from lesson completion
        lastAccessed: new Date()
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new EnrollmentService();
