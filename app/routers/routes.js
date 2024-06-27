import express from 'express';
import { AdminAuthRouter, CustomerRouter, EmployeeRouter } from './index.js';

const router = express.Router();

const apiRoutes = [
    {
        path: '/auth/admin',
        route: AdminAuthRouter,
    },
    {
        path: '/customer',
        route: CustomerRouter,
    },
    {
        path: '/employee',
        route: EmployeeRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;