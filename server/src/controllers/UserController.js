import bcrypt from "bcrypt";
import Users from "../models/users";
import Authorization from "../middlewares/Authorization";

class UserController {
  /**
   * @static
   * @description this method takes in the params from the req.body then goes through
   * a middleware to validate the req.body then it generates a token taking in the user's id and type
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} a json body with the user's generated data
   * @memberof Controller
   */
  static async signup(req, res) {
    try {
      const { rows } = await Users.create(req, req.body);
      const token = Authorization.generateToken(
        UserController.getTokenObj(rows[0])
      );
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
          error: "Sorry, email already taken"
        });
      }
      return res.status(500).json({
        status: res.statusCode,
        error
      });
    }
  }

  /**
   * @static
   * @description this method takes in the params from the req.body then goes through
   * a middleware to validate the req.body then it generates a token taking in the user's id and type
   * granting a user access to the platform
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} a json body with the user's generated data
   * @memberof Controller
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const { rows } = await Users.find(email);
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        error: "Invalid credentials, inputed details does not match our records"
      });
    }
    const isPasswordValid = await UserController.verifyPassword(
      password,
      rows[0].password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        error: "Invalid credentials, inputed details does not match our record"
      });
    }
    const token = Authorization.generateToken(
      UserController.getTokenObj(rows[0])
    );
    return res.status(200).json({
      status: 200,
      data: {
        token,
        user: UserController.getUserobj(rows[0])
      }
    });
  }


/**
* @static
* @description this method takes in the params from the req.body then goes through
* a middleware to validate the req.body then it generates a token taking in the user's id and type
* @param {object} req - Request object
* @param {object} res - Response object
* @returns {object} a json body with the user's generated data
* @memberof Controller
*/
  static async staff(req, res) {
    try {
      const { rows } = await Users.createStaff(req, req.body);
      const token = Authorization.generateToken(
        UserController.getTokenObj(rows[0])
      );
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
          error: "Sorry, email already taken"
        });
      }
      return res.status(500).json({
        status: res.statusCode,
        error
      });
    }
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

/**
 * @method getTokenObj
 * @memberof UserController
 * @param {string} 
 * @param {string} 
 * @return a token data containing the user type and id
 */
  static getTokenObj(data) {
    return {
      id: data.id,
      type: data.type
    };
  }
}

export default UserController;
