import { Router } from 'express';
import auth from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import { me, updateMe, deleteMe } from '../controllers/user.controller.js';
import User from '../models/User.js';

const router = Router();
router.use(auth);

router.get('/me', me);
router.put('/me', updateMe);
router.delete('/me', deleteMe);

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (e) { next(e); }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (e) { next(e); }
});

export default router;
