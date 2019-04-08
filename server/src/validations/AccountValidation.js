import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createAccount: [
    check("type")
      .trim()
      .exists()
      .withMessage("Type must be specified")
      .custom(value => notEmpty(value, "Type field cannot be left blank"))
      .isIn(["savings", "current"])
      .withMessage("Account type does not exist"),
    check("balance")
      .trim()
      .exists()
      .withMessage("Opening Balance must be specified")
      .custom(value => notEmpty(value, "Opening Balance cannot be left blank"))
      .isNumeric()
      .withMessage("Balance must be an Integer")
  ],
  updateAccount: [
    check('status')
      .trim()
      .exists()
      .withMessage('Status must be specified')
      .custom(value => notEmpty(value, 'Status field cannot be left blank'))
      .isIn(['active', 'dormant'])
      .withMessage('Status type does not exist'),
  ],
};    