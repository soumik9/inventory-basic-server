import express from 'express';
import { AuthRouter, CustomerRouter } from './index.js';

const router = express.Router();

const apiRoutes = [
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/customer',
        route: CustomerRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;