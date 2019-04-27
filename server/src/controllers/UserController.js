/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import Users from '../models/users';
import Authorization from '../middlewares/Authorization';

class UserController {
  static async signup(req, res)
   /**
   *
   * @static
   * @description this method takes in the params from the req.body then goes through
   * a middleware to validate the req.body then it generates a token taking in the user's id and type
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} a json body with the user's generated data
   * @memberof Controller
   */ {
    try {
      const { rows } = await Users.create(req, req.body);
      const { id, type } = rows[0];
      const token = Authorization.generateToken({ id, type });
      return res.status(201).json({
        status: res.statusCode,
        message: "User registered successfully",
        data: {
          token,
          user: UserController.getUserobj(rows[0])
        }
      });
    } catch (error) {
      if (error.routine === "_bt_check_unique") {
        return res.status(400).json({
          status: res.statusCode,
          error: "Email already taken"
        });
      }
      return res.status(500).json({
        status: res.statusCode,
        error
      });
    }
  }

 
  static async login(req, res) {
    const { email, password } = req.body;
    const { rows } = await Users.find(email);
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Credentials',
      });
    }
    const isPasswordValid = await UserController.verifyPassword(password, rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Credentials',
      });
    }
    const { id, type } = rows[0];
    const token = Authorization.generateToken({ id, type });
    return res.status(200).json({
      status: 200,
      data: {
        token,
        user: UserController.getUserobj(rows[0])
      }
    });
  }


  /**
   * @method verifyPassword
   * @memberof UserController
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static getUserobj(data) {
    return {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      type: data.type,
      is_admin: data.is_admin,
      created_at: data.created_at
    };
  }
}

export default UserController;
