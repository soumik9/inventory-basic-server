import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import TransactionController from '../controllers/TransactionController.js';

//routes
router.get('/customer/all/:customerId', auth(), TransactionController.GetAllTransactionByCustomerId);

export const TransactionRouter = router;