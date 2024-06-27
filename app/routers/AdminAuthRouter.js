import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import AdminAuthController from '../controllers/AdminAuthController.js';

//routes
router.post('/signin', AdminAuthController.Signin);
router.get('/profile', auth(), AdminAuthController.Profile);

export const AdminAuthRouter = router;