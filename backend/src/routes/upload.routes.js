import { Router } from 'express';
import multer from 'multer';
import auth from '../middlewares/auth.js';
import { uploadProfilePicture } from '../controllers/upload.controller.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/profile-picture', auth, upload.single('file'), uploadProfilePicture);

export default router;
