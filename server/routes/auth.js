import express from 'express';
import UserService from '../services/UserService.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';

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

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not available. Please try again later.' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a simple reset token (in production, you'd send this via email)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Store reset token in user document (in production, add expiration)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    res.json({
      message: 'Password reset instructions sent to your email',
      resetToken: resetToken // In production, remove this and send via email
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not available. Please try again later.' });
    }

    // Find user by email and reset token
    const user = await User.findOne({ 
      email, 
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
