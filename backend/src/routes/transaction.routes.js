import { Router } from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { transactionCreateSchema, transactionUpdateSchema } from '../schemas/transaction.schema.js';
import { create, list, update, remove, monthlySummary } from '../controllers/transaction.controller.js';

const router = Router();
router.use(auth);

router.post('/', validate(transactionCreateSchema), create);
router.get('/', list);
router.get('/monthly-summary', monthlySummary);
router.put('/:id', validate(transactionUpdateSchema), update);
router.delete('/:id', remove);

export default router;
