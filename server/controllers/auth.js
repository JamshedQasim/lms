import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const getJwtSecret = () => {
	const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
	if (!process.env.JWT_SECRET) {
		console.warn('JWT_SECRET not set. Using insecure default for development.');
	}
	return secret;
};

export const register = async (req, res) => {
	try {
		const { name, email, password, imageUrl } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(409).json({ message: 'User already exists' });
		}

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({
			_id: new mongoose.Types.ObjectId().toHexString(),
			name: name || '',
			email,
			imageUrl: imageUrl || '',
			password: hashed,
		});

		return res.status(201).json({
			message: 'Registered successfully',
			user: { _id: user._id, name: user.name, email: user.email, imageUrl: user.imageUrl },
		});
	} catch (err) {
		console.error('Register error:', err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ email }).select('+password');
		if (!user || !user.password) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const ok = await bcrypt.compare(password, user.password);
		if (!ok) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ sub: user._id, email: user.email }, getJwtSecret(), { expiresIn: '7d' });
		return res.json({
			message: 'Login successful',
			token,
			user: { _id: user._id, name: user.name, email: user.email, imageUrl: user.imageUrl },
		});
	} catch (err) {
		console.error('Login error:', err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};