import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export async function overview(req, res, next) {
  try {
    const totalUsers = await User.countDocuments();
    const incomeAgg = await Transaction.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const expenseAgg = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const topCategories = await Transaction.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: 1 } },
      { $limit: 5 }
    ]);
    res.json({
      totalUsers,
      totalIncome: incomeAgg[0]?.total || 0,
      totalExpense: expenseAgg[0]?.total || 0,
      topCategories
    });
  } catch (e) { next(e); }
}
