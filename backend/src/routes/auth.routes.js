import { Router } from 'express';
import validate from '../middlewares/validate.js';
import auth from '../middlewares/auth.js';
import { register, login, profile } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', auth, profile);

export default router;
