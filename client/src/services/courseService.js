import api from './api.js';

class CourseService {
  // Get all courses
  async getAllCourses(filters = {}) {
    try {
      const response = await api.get('/v1/courses', { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get course by ID
  async getCourseById(courseId) {
    try {
      const response = await api.get(`/v1/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get enrolled courses
  async getEnrolledCourses() {
    try {
      const response = await api.get('/v1/courses/enrolled');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get instructor courses
  async getInstructorCourses() {
    try {
      const response = await api.get('/v1/courses/instructor');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create new course (instructor only)
  async createCourse(courseData) {
    try {
      const response = await api.post('/v1/courses', courseData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update course (instructor only)
  async updateCourse(courseId, courseData) {
    try {
      const response = await api.put(`/v1/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete course (instructor only)
  async deleteCourse(courseId) {
    try {
      const response = await api.delete(`/v1/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Enroll in course
  async enrollInCourse(courseId) {
    try {
      const response = await api.post(`/v1/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Unenroll from course
  async unenrollFromCourse(courseId) {
    try {
      const response = await api.delete(`/v1/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      return new Error('Cannot connect to server. Please check your internet connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new CourseService();
