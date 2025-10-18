import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d'
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.validated;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already used' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: role || 'user' });

    res.status(201).json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.validated;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
  } catch (e) { next(e); }
}

export async function profile(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) { next(e); }
}
