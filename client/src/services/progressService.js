import api from './api.js';

class ProgressService {
  // Get course progress
  async getCourseProgress(courseId) {
    try {
      const response = await api.get(`/v1/progress/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get lesson progress
  async getLessonProgress(lessonId) {
    try {
      const response = await api.get(`/v1/progress/lesson/${lessonId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark lesson as complete
  async markLessonComplete(lessonId) {
    try {
      const response = await api.post(`/v1/progress/lesson/${lessonId}/complete`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark lesson as incomplete
  async markLessonIncomplete(lessonId) {
    try {
      const response = await api.delete(`/v1/progress/lesson/${lessonId}/complete`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update lesson progress (for video progress, quiz scores, etc.)
  async updateLessonProgress(lessonId, progressData) {
    try {
      const response = await api.put(`/v1/progress/lesson/${lessonId}`, progressData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get overall learning progress
  async getOverallProgress() {
    try {
      const response = await api.get('/v1/progress/overall');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get progress analytics
  async getProgressAnalytics(timeframe = 'month') {
    try {
      const response = await api.get(`/v1/progress/analytics?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get streak information
  async getLearningStreak() {
    try {
      const response = await api.get('/v1/progress/streak');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get achievements
  async getAchievements() {
    try {
      const response = await api.get('/v1/progress/achievements');
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

export default new ProgressService();
