import express from 'express';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.json({
    status: 200,
    message: 'Welcome to Banka API',
}));

apiRoutes.get('/v1', (req, res) => res.json({
    status: 200,
    message: 'Welcome to version 1 of Banka API',
}));


export default apiRoutes;