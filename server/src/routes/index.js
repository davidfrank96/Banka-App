import express from 'express';
import userRoutes from './users';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.json({
    status: 200,
    message: 'Welcome to Banka API',
}));

apiRoutes.get('/v1', (req, res) => res.json({
    status: 200,
    message: 'Welcome to version 1 of Banka API',
}));

apiRoutes.use('/v1/auth', userRoutes);


export default apiRoutes;