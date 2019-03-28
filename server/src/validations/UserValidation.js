import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
    signup: [
        check('firstname')
            .trim()
            .exists()
            .withMessage('Firstname must be specific')
            .custom(value => notEmpty(value, 'Firstname field cannot be left blank')),
        check('lastname')
            .trim()
            .exists()
            .withMessage('Lastname must be specific')
            .custom(value => notEmpty(value, 'Lastname field cannot be left blank')),
        check('email')
            .trim()
            .exists()
            .withMessage('Email must be specific')
            .custom(value => notEmpty(value, 'email field cannot be left blank'))
            .isEmail()
            .withMessage('Please input a valid email address'),
        check('type')
            .trim()
            .exists()
            .withMessage('Type must be specified')
            .custom(value => notEmpty(value, 'Type field cannot be left blank'))
            .isIn(['Client', 'Staff'])
            .withMessage('Type type does not exist'),
        check('password')
            .trim()
            .exists().withMessage('Password field is required')
            .isLength({ min: 6 })
            .withMessage('Password must be minimum of 6 characters'),
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
            .exists().withMessage('Password field is required')
            .isLength({ min: 6 })
            .withMessage('Password must be minimum of 6 characters'),
    ],
};