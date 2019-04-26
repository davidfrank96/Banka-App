/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import UserModel from '../models/users';

class Authorization {
    /**
         * @method getToken
         * @memberof Authorization
         * @param {object} req
         * @returns {string} token
         */
    static getToken(req) {
        const bearerToken = req.headers.authorization;
        const token = bearerToken && bearerToken.replace('Bearer ', '');

        return token;
    }

    /**
       * @method generateToken
       * @memberof Authorization
       * @param {object} user
       * @returns {string} token
       * expires in 24 hours
       */
    static generateToken({ ...user }) {
        const token = jwt.sign({ user },
            process.env.SECRET, {
                expiresIn: 86400000000000000,
            });

        return token;
    }

    /**
       * Authorize user
       * @method authenticate
       * @memberof Authorization
       * @param {object} req
       * @param {object} res
       * @param {function} next
       * @returns {(function|object)} Function next() or JSON object
       */
    // eslint-disable-next-line consistent-return
    static async authenticate(req, res, next) {
        try {
            const token = Authorization.getToken(req);
            if (!token) {
                return res.status(401).json({
                    status: 401,
                    error: 'Unauthorized user',
                });
            }
            const decoded = await jwt.verify(token, process.env.SECRET);
            const response = UserModel.find(decoded.user.id);
            if (!response) {
                return res.status(400).json({
                    status: 400,
                    message: 'Token is invalid',
                });
            }
            req.user = decoded.user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    status: 401,
                    error: 'Token Expired',
                });
            }
        }
    }

    static async isStaff(req, res, next) {
        const { id } = req.user;
        const { rows } = await UserModel.findById(id);
        try {
            if (rows[0].type === 'Client') {
                return res.status(403).json({
                    status: 403,
                    error: 'Forbidden access, Admin or Staff only',
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            });
        }
    }
}

export default Authorization;
