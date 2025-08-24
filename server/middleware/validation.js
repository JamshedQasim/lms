import Joi from 'joi';

// Registration validation schema
const registrationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string().min(6).required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password'
    }),
  role: Joi.string().valid('student', 'instructor').default('student'),
  imageUrl: Joi.string().uri().optional()
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string().required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Validation middleware functions
export const validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

// Course validation schema
export const courseSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(20).max(2000).required(),
  category: Joi.string().required(),
  level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
  price: Joi.number().min(0).required(),
  tags: Joi.array().items(Joi.string()),
  language: Joi.string().default('English'),
  thumbnailUrl: Joi.string().uri().required()
});

// Lesson validation schema
export const lessonSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(1000),
  contentType: Joi.string().valid('video', 'pdf', 'html', 'quiz', 'assignment').required(),
  contentUrl: Joi.string().uri().when('contentType', {
    is: 'video',
    then: Joi.required()
  }),
  duration: Joi.number().min(0),
  isFreePreview: Joi.boolean().default(false)
});
