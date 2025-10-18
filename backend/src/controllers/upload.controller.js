import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';

export async function uploadProfilePicture(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file' });
    const b64 = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'finance_tracker/avatars',
      transformation: [{ width: 300, height: 300, crop: 'fill' }]
    });
    const user = await User.findByIdAndUpdate(req.user.id, { avatarUrl: result.secure_url }, { new: true }).select('-password');
    res.json({ message: 'Uploaded', avatarUrl: user.avatarUrl, user });
  } catch (e) { next(e); }
}
