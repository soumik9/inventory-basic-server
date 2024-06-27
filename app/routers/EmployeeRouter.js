import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import EmplyeeController from '../controllers/EmplyeeController.js';

//routes
router.post('/create', auth(), EmplyeeController.CreateEmployee);

export const EmployeeRouter = router;