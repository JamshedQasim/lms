import api from './api.js';

class SearchService {
  // Search courses with filters
  async searchCourses(query, filters = {}) {
    try {
      const params = {
        q: query,
        ...filters
      };
      
      const response = await api.get('/v1/search/courses', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get course categories
  async getCategories() {
    try {
      const response = await api.get('/v1/search/categories');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get course levels
  async getLevels() {
    try {
      const response = await api.get('/v1/search/levels');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get course languages
  async getLanguages() {
    try {
      const response = await api.get('/v1/search/languages');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get popular tags
  async getPopularTags() {
    try {
      const response = await api.get('/v1/search/popular-tags');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get trending courses
  async getTrendingCourses(limit = 10) {
    try {
      const response = await api.get('/v1/search/trending', { params: { limit } });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get recommended courses for user
  async getRecommendedCourses(limit = 10) {
    try {
      const response = await api.get('/v1/search/recommended', { params: { limit } });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get courses by instructor
  async getCoursesByInstructor(instructorId, filters = {}) {
    try {
      const params = { instructorId, ...filters };
      const response = await api.get('/v1/search/instructor-courses', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get courses by category
  async getCoursesByCategory(categoryId, filters = {}) {
    try {
      const params = { categoryId, ...filters };
      const response = await api.get('/v1/search/category-courses', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get courses by price range
  async getCoursesByPrice(minPrice = 0, maxPrice = null, filters = {}) {
    try {
      const params = { minPrice, maxPrice, ...filters };
      const response = await api.get('/v1/search/price-range', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get courses by duration
  async getCoursesByDuration(minDuration = 0, maxDuration = null, filters = {}) {
    try {
      const params = { minDuration, maxDuration, ...filters };
      const response = await api.get('/v1/search/duration-range', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get courses by rating
  async getCoursesByRating(minRating = 0, filters = {}) {
    try {
      const params = { minRating, ...filters };
      const response = await api.get('/v1/search/rating-filter', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get recently added courses
  async getRecentlyAddedCourses(limit = 10) {
    try {
      const response = await api.get('/v1/search/recent', { params: { limit } });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get best selling courses
  async getBestSellingCourses(limit = 10) {
    try {
      const response = await api.get('/v1/search/best-selling', { params: { limit } });
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

export default new SearchService();
