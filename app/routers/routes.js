import express from 'express';
import { AuthRouter } from './index.js';

const router = express.Router();

const apiRoutes = [
    {
        path: '/auth',
        route: AuthRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;