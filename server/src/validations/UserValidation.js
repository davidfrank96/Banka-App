import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  signup: [
    check('first_name')
      .trim()
      .exists()
      .withMessage('first_name is required')
      .custom(value => notEmpty(value, 'first_name is required')),
    check('last_name')
      .trim()
      .exists()
      .withMessage('last_name is required')
      .custom(value => notEmpty(value, 'last_name is required')),
    check('email')
      .trim()
      .exists()
      .withMessage('Email is required', 'email must be a valid email address')
      .custom(value => notEmpty(
        value,
        'Email is required',
        'email must be a valid email address'
      ))
      .isEmail()
      .withMessage('Email is required',
        'email must be a valid email address'),
    check('type')
      .trim()
      .exists()
      .withMessage('Type must be specified')
      .custom(value => notEmpty(value, 'Type field cannot be left blank'))
      .isIn(['Client', 'Staff'])
      .withMessage('User type does not exist'),
    check('password')
      .trim()
      .exists()
      .withMessage('Password field is required')
      .isLength({ min: 6 })
      .withMessage('Password must be minimum of 6 characters')
  ],
  login: [
    check('email')
      .trim()
      .exists()
      .withMessage('Email must be specific')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('Please input a valid email address'),
    check('password')
      .trim()
      .exists()
      .withMessage('Password field is required')
      .isLength({ min: 6 })
      .withMessage('Password must be minimum of 6 characters')
  ]
};
