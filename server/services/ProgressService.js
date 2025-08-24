import User from '../models/User.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

class ProgressService {
  // Update lesson progress
  async updateLessonProgress(userId, lessonId, progressData) {
    try {
      const { percent, lastWatchedSec, completed } = progressData;
      
      // Get lesson details
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        throw new Error('Lesson not found');
      }

      // Check if user is enrolled in the course
      const isEnrolled = await this.isUserEnrolledInCourse(userId, lesson.moduleId);
      if (!isEnrolled) {
        throw new Error('User must be enrolled to track progress');
      }

      // Update or create progress record
      // In a full implementation, you'd have a Progress model
      // For now, we'll store basic progress in user document
      
      const user = await User.findById(userId);
      if (!user.lessonProgress) {
        user.lessonProgress = {};
      }

      user.lessonProgress[lessonId] = {
        percent: percent || 0,
        lastWatchedSec: lastWatchedSec || 0,
        completed: completed || false,
        lastUpdated: new Date()
      };

      await user.save();

      return {
        lessonId,
        progress: user.lessonProgress[lessonId]
      };
    } catch (error) {
      throw error;
    }
  }

  // Get lesson progress
  async getLessonProgress(userId, lessonId) {
    try {
      const user = await User.findById(userId);
      if (!user.lessonProgress || !user.lessonProgress[lessonId]) {
        return {
          lessonId,
          percent: 0,
          lastWatchedSec: 0,
          completed: false,
          lastUpdated: null
        };
      }

      return {
        lessonId,
        ...user.lessonProgress[lessonId]
      };
    } catch (error) {
      throw error;
    }
  }

  // Get course progress
  async getCourseProgress(userId, courseId) {
    try {
      // Check if user is enrolled
      const isEnrolled = await this.isUserEnrolledInCourse(userId, courseId);
      if (!isEnrolled) {
        throw new Error('User must be enrolled to view progress');
      }

      // Get course modules and lessons
      const course = await Course.findById(courseId).populate('modules');
      if (!course) {
        throw new Error('Course not found');
      }

      const user = await User.findById(userId);
      let totalLessons = 0;
      let completedLessons = 0;
      let totalProgress = 0;

      // Calculate progress across all modules
      for (const module of course.modules) {
        const lessons = await Lesson.find({ moduleId: module._id });
        totalLessons += lessons.length;

        for (const lesson of lessons) {
          const progress = user.lessonProgress?.[lesson._id];
          if (progress) {
            totalProgress += progress.percent;
            if (progress.completed) {
              completedLessons++;
            }
          }
        }
      }

      const overallProgress = totalLessons > 0 ? Math.round(totalProgress / totalLessons) : 0;
      const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        courseId,
        totalLessons,
        completedLessons,
        overallProgress,
        completionRate,
        lastAccessed: new Date()
      };
    } catch (error) {
      throw error;
    }
  }

  // Mark lesson as completed
  async completeLesson(userId, lessonId) {
    try {
      const progressData = {
        percent: 100,
        lastWatchedSec: 0,
        completed: true
      };

      return await this.updateLessonProgress(userId, lessonId, progressData);
    } catch (error) {
      throw error;
    }
  }

  // Get user's overall learning statistics
  async getUserLearningStats(userId) {
    try {
      const user = await User.findById(userId).populate('enrolledCourses');
      
      let totalCourses = user.enrolledCourses.length;
      let totalLessons = 0;
      let completedLessons = 0;
      let totalHours = 0;

      // Calculate statistics across all enrolled courses
      for (const course of user.enrolledCourses) {
        const courseProgress = await this.getCourseProgress(userId, course._id);
        totalLessons += courseProgress.totalLessons;
        completedLessons += courseProgress.completedLessons;
        
        // Estimate hours based on course duration
        if (course.totalDuration) {
          totalHours += course.totalDuration / 60; // Convert minutes to hours
        }
      }

      return {
        totalCourses,
        totalLessons,
        completedLessons,
        totalHours: Math.round(totalHours * 10) / 10, // Round to 1 decimal
        completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      };
    } catch (error) {
      throw error;
    }
  }

  // Helper method to check enrollment
  async isUserEnrolledInCourse(userId, courseId) {
    try {
      const user = await User.findById(userId);
      return user.enrolledCourses.includes(courseId);
    } catch (error) {
      return false;
    }
  }
}

export default new ProgressService();
