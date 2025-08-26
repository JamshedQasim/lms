import api from './api.js';

class ReviewService {
  // Get course reviews
  async getCourseReviews(courseId, filters = {}) {
    try {
      const response = await api.get(`/v1/courses/${courseId}/reviews`, { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add a review to a course
  async addReview(courseId, reviewData) {
    try {
      const response = await api.post(`/v1/courses/${courseId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update a review
  async updateReview(reviewId, reviewData) {
    try {
      const response = await api.put(`/v1/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a review
  async deleteReview(reviewId) {
    try {
      const response = await api.delete(`/v1/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user's reviews
  async getUserReviews(filters = {}) {
    try {
      const response = await api.get('/v1/reviews/user', { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Like a review
  async likeReview(reviewId) {
    try {
      const response = await api.post(`/v1/reviews/${reviewId}/like`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Unlike a review
  async unlikeReview(reviewId) {
    try {
      const response = await api.delete(`/v1/reviews/${reviewId}/like`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Report a review
  async reportReview(reviewId, reason) {
    try {
      const response = await api.post(`/v1/reviews/${reviewId}/report`, { reason });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get course rating statistics
  async getCourseRatingStats(courseId) {
    try {
      const response = await api.get(`/v1/courses/${courseId}/rating-stats`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get top reviews for a course
  async getTopReviews(courseId, limit = 5) {
    try {
      const response = await api.get(`/v1/courses/${courseId}/top-reviews`, { params: { limit } });
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

export default new ReviewService();
