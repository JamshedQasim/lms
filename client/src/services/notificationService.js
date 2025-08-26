import api from './api.js';

class NotificationService {
  // Get all notifications for user
  async getNotifications(filters = {}) {
    try {
      const response = await api.get('/v1/notifications', { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get unread notifications count
  async getUnreadCount() {
    try {
      const response = await api.get('/v1/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const response = await api.put(`/v1/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      const response = await api.put('/v1/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(`/v1/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification preferences
  async getPreferences() {
    try {
      const response = await api.get('/v1/notifications/preferences');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update notification preferences
  async updatePreferences(preferences) {
    try {
      const response = await api.put('/v1/notifications/preferences', preferences);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Subscribe to course notifications
  async subscribeToCourse(courseId) {
    try {
      const response = await api.post(`/v1/notifications/subscribe/${courseId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Unsubscribe from course notifications
  async unsubscribeFromCourse(courseId) {
    try {
      const response = await api.delete(`/v1/notifications/subscribe/${courseId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification types
  async getNotificationTypes() {
    try {
      const response = await api.get('/v1/notifications/types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send test notification
  async sendTestNotification(type) {
    try {
      const response = await api.post('/v1/notifications/test', { type });
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

export default new NotificationService();
