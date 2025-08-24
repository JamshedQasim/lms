import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

class UserService {
  // Create new user
  async createUser(userData) {
    try {
      const { name, email, password, role = 'student', imageUrl } = userData;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = new User({
        _id: new mongoose.Types.ObjectId().toString(),
        name,
        email,
        password: hashedPassword,
        role,
        imageUrl: imageUrl || 'https://via.placeholder.com/150',
        enrolledCourses: [],
        wishlist: [],
        createdAt: new Date()
      });

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Authenticate user
  async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Generate JWT token
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  }

  // Get user profile with enrollments
  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId)
        .populate('enrolledCourses')
        .select('-password');
      
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get user enrollments
  async getUserEnrollments(userId) {
    try {
      const user = await User.findById(userId)
        .populate('enrolledCourses')
        .select('enrolledCourses');
      
      return user?.enrolledCourses || [];
    } catch (error) {
      throw error;
    }
  }

  // Add course to wishlist
  async addToWishlist(userId, courseId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: courseId } },
        { new: true }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Remove course from wishlist
  async removeFromWishlist(userId, courseId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: courseId } },
        { new: true }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
