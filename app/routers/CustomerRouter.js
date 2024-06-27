import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import CustomerController from '../controllers/CustomerController.js';

//routes
router.post('/create', CustomerController.CreateCustomer);

export const CustomerRouter = router;