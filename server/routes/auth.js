import express from 'express';
import UserService from '../services/UserService.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Signup endpoint
router.post('/signup', validateRegistration, async (req, res) => {
  try {
    const { name, email, password, imageUrl, role } = req.body;

    // Create user using service
    const user = await UserService.createUser({
      name,
      email,
      password,
      imageUrl,
      role
    });

    // Generate JWT token
    const token = UserService.generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.message === 'User already exists') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login endpoint - Require proper authentication
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user using service
    const user = await UserService.authenticateUser(email, password);

    // Generate JWT token
    const token = UserService.generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
        enrolledCourses: user.enrolledCourses || []
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error.message === 'Invalid email or password') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await UserService.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address. Please sign up first.' });
    }

    // In a real application, you would send an email with reset instructions
    // For demo purposes, we'll just return a success message
    res.json({ 
      message: 'Password reset instructions have been sent to your email address.',
      demo: 'This is a demo. In a real app, you would receive an email with reset instructions.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to process password reset request' });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a real application, you might want to add the token to a blacklist
    // For now, we'll just return a success message
    // The frontend will handle removing the token from localStorage
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Failed to logout' });
  }
});

export default router;
