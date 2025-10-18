import Category from '../models/Category.js';

export async function list(req, res, next) {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (e) { next(e); }
}
