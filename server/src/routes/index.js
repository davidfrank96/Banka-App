import express from 'express';
import userRoutes from './users';
import accountRoutes from "./accounts";
import transactionRoutes from "./transactions";

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
apiRoutes.use("/v1/accounts", accountRoutes);
apiRoutes.use("/v1/transactions", transactionRoutes);

export default apiRoutes;