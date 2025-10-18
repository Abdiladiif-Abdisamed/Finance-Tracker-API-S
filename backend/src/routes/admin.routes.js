import { Router } from 'express';
import auth from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import { overview } from '../controllers/admin.controller.js';

const router = Router();
router.get('/overview', auth, isAdmin, overview);

export default router;
