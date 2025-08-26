import api from './api.js';

class ForumService {
  // Get course discussions
  async getCourseDiscussions(courseId, filters = {}) {
    try {
      const response = await api.get(`/v1/courses/${courseId}/discussions`, { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create a new discussion
  async createDiscussion(courseId, discussionData) {
    try {
      const response = await api.post(`/v1/courses/${courseId}/discussions`, discussionData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get discussion by ID
  async getDiscussion(discussionId) {
    try {
      const response = await api.get(`/v1/discussions/${discussionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update discussion
  async updateDiscussion(discussionId, discussionData) {
    try {
      const response = await api.put(`/v1/discussions/${discussionId}`, discussionData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete discussion
  async deleteDiscussion(discussionId) {
    try {
      const response = await api.delete(`/v1/discussions/${discussionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add reply to discussion
  async addReply(discussionId, replyData) {
    try {
      const response = await api.post(`/v1/discussions/${discussionId}/replies`, replyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update reply
  async updateReply(replyId, replyData) {
    try {
      const response = await api.put(`/v1/replies/${replyId}`, replyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete reply
  async deleteReply(replyId) {
    try {
      const response = await api.delete(`/v1/replies/${replyId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark discussion as resolved
  async markAsResolved(discussionId) {
    try {
      const response = await api.put(`/v1/discussions/${discussionId}/resolve`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Pin discussion
  async pinDiscussion(discussionId) {
    try {
      const response = await api.put(`/v1/discussions/${discussionId}/pin`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Unpin discussion
  async unpinDiscussion(discussionId) {
    try {
      const response = await api.delete(`/v1/discussions/${discussionId}/pin`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search discussions
  async searchDiscussions(query, filters = {}) {
    try {
      const params = { q: query, ...filters };
      const response = await api.get('/v1/discussions/search', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get popular discussions
  async getPopularDiscussions(courseId, limit = 10) {
    try {
      const response = await api.get(`/v1/courses/${courseId}/popular-discussions`, { params: { limit } });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user's discussions
  async getUserDiscussions(filters = {}) {
    try {
      const response = await api.get('/v1/discussions/user', { params: filters });
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

export default new ForumService();
