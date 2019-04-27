import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  transact: [
    check('amount')
      .trim()
      .exists()
      .withMessage('Amount must be specified')
      .custom(value => notEmpty(value, 'Amount field cannot be left blank'))
      .isNumeric()
      .withMessage('Balance must be an Integer'),
  ],
};
