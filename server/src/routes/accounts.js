import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import AccountController from '../controllers/AccountController';
import AccountValidation from '../validations/AccountValidation';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';

const accountRoutes = express.Router();
const validation = [
  ValidationHandler.validate,
  Trim.trim,
  ValidationHandler.isEmptyReq
];

accountRoutes.use(Authorization.authenticate);

accountRoutes.post('/', AccountValidation.createAccount, validation, AccountController.createAccount);
accountRoutes.patch('/:id', Authorization.isStaff, AccountValidation.updateAccount, validation, AccountController.update);
accountRoutes.delete('/:id', Authorization.isStaff, AccountController.delete);
accountRoutes.get('/', AccountController.getAllAccountDetails);
accountRoutes.get('/:id', AccountController.getAccountDetails);
accountRoutes.get('/:id/transactions', AccountController.transactionHistory);

export default accountRoutes;
