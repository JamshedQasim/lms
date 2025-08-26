import api from './api.js';

class UserService {
  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/v1/users/profile');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/v1/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.put('/v1/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await api.post('/v1/users/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const response = await api.get('/v1/users/stats');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get learning history
  async getLearningHistory() {
    try {
      const response = await api.get('/v1/users/learning-history');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get certificates
  async getCertificates() {
    try {
      const response = await api.get('/v1/users/certificates');
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

export default new UserService();
