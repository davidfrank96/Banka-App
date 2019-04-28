import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import AccountController from '../controllers/AccountController';
import AccountValidation from '../validations/AccountValidation';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';

const accountRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

accountRoutes.use(Authorization.authenticate);

accountRoutes.get('/', Authorization.isAdmin, AccountController.getAllAccountDetails);
accountRoutes.post('/', AccountValidation.createAccount, validation, AccountController.createAccount);
accountRoutes.get('/:id/transactions', Authorization.isAdmin, AccountController.transactionHistory);
accountRoutes.get('/:id', Authorization.isAdmin, AccountController.getAccountDetails);
accountRoutes.patch('/:id', Authorization.isAdmin, AccountValidation.updateAccount, validation, AccountController.update);
accountRoutes.delete('/:id', Authorization.isAdmin, AccountController.delete);

export default accountRoutes;
