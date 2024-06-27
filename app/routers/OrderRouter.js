import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import OrderController from '../controllers/OrderController.js';

//routes
router.post('/create', auth(), OrderController.CreateOrder);

export const OrderRouter = router;