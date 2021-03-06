import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import TransactionController from '../controllers/TransactionController';
import TransactionValidation from '../validations/TransactionValidation';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';

const transactionRoute = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

transactionRoute.use(Authorization.authenticate);

transactionRoute.post('/:id/credit', Authorization.isCashier, TransactionValidation.transact, validation, TransactionController.credit);
transactionRoute.post('/:id/debit', Authorization.isCashier, TransactionValidation.transact, validation, TransactionController.debit);
transactionRoute.get('/:id', Authorization.isAdmin, TransactionController.getTransaction);

export default transactionRoute;
