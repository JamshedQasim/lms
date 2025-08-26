import api from './api.js';

class ChatService {
  // Get chat rooms for a course
  async getCourseChatRooms(courseId) {
    try {
      const response = await api.get(`/v1/courses/${courseId}/chat-rooms`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create a new chat room
  async createChatRoom(courseId, roomData) {
    try {
      const response = await api.post(`/v1/courses/${courseId}/chat-rooms`, roomData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Join a chat room
  async joinChatRoom(roomId) {
    try {
      const response = await api.post(`/v1/chat-rooms/${roomId}/join`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Leave a chat room
  async leaveChatRoom(roomId) {
    try {
      const response = await api.post(`/v1/chat-rooms/${roomId}/leave`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get chat messages
  async getChatMessages(roomId, filters = {}) {
    try {
      const response = await api.get(`/v1/chat-rooms/${roomId}/messages`, { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send a message
  async sendMessage(roomId, messageData) {
    try {
      const response = await api.post(`/v1/chat-rooms/${roomId}/messages`, messageData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update a message
  async updateMessage(messageId, messageData) {
    try {
      const response = await api.put(`/v1/messages/${messageId}`, messageData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a message
  async deleteMessage(messageId) {
    try {
      const response = await api.delete(`/v1/messages/${messageId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get online users in a room
  async getOnlineUsers(roomId) {
    try {
      const response = await api.get(`/v1/chat-rooms/${roomId}/online-users`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Start a private chat
  async startPrivateChat(userId) {
    try {
      const response = await api.post('/v1/chat/private', { userId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get private chats
  async getPrivateChats() {
    try {
      const response = await api.get('/v1/chat/private');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send private message
  async sendPrivateMessage(userId, messageData) {
    try {
      const response = await api.post(`/v1/chat/private/${userId}/messages`, messageData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get support chat
  async getSupportChat() {
    try {
      const response = await api.get('/v1/chat/support');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send support message
  async sendSupportMessage(messageData) {
    try {
      const response = await api.post('/v1/chat/support/messages', messageData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark messages as read
  async markMessagesAsRead(roomId) {
    try {
      const response = await api.put(`/v1/chat-rooms/${roomId}/mark-read`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get unread message count
  async getUnreadCount() {
    try {
      const response = await api.get('/v1/chat/unread-count');
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

export default new ChatService();
