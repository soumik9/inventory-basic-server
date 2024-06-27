import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import CustomerController from '../controllers/CustomerController.js';

//routes
router.post('/create', auth(), CustomerController.CreateCustomer);
router.get('/all', auth(), CustomerController.GetAllCustomers);

export const CustomerRouter = router;