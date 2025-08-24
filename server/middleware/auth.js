import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get user from database to check if still exists
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Add user info to request
    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
};

// Role-based authorization
export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions for this action' 
      });
    }

    next();
  };
};

// Check if user owns the resource (for instructors)
export const authorizeOwnership = (resourceModel) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      // Admins can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      // For instructors, check if they own the resource
      if (req.user.role === 'instructor') {
        const resource = await resourceModel.findById(req.params.id);
        if (!resource) {
          return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.instructorId.toString() !== req.user.userId) {
          return res.status(403).json({ 
            message: 'You can only modify your own resources' 
          });
        }
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({ message: 'Authorization check failed' });
    }
  };
};

// Optional authentication (for public routes that can work with or without auth)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user) {
        req.user = {
          userId: user._id,
          email: user.email,
          role: user.role,
          name: user.name
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional routes
    next();
  }
};
