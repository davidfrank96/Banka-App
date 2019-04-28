import express from 'express';
import userRoutes from './users';
import accountRoutes from './accounts';
import transactionRoutes from './transactions';
import AccountController from '../controllers/AccountController';
import UserController from '../controllers/UserController';
import UserValidation from '../validations/UserValidation';
import Authorization from '../middlewares/Authorization';
import Trim from '../middlewares/Trim';
import ValidationHandler from '../middlewares/ValidationHandler';

const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

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
apiRoutes.use('/v1/accounts', accountRoutes);
apiRoutes.use('/v1/transactions', transactionRoutes);
apiRoutes.use('/v1/admin', Authorization.authenticate, Authorization.isAdmin, UserValidation.signup, validation, UserController.staff);
apiRoutes.get('/v1/user/:email/accounts', Authorization.authenticate, Authorization.isAdmin, AccountController.accounts);


export default apiRoutes;
