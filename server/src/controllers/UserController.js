import bcrypt from 'bcrypt';
import Users from '../models/users';
import Authorization from '../middlewares/Authorization';


class UserController {
  static async signup(req, res) {
    const createdUser = await Users.create(req.body);
    const token = await Authorization.generateToken(createdUser);
    return res.status(201).json({
      status: 201,
      data: {
        token,
        user: UserController.getUserobj(createdUser)
      }
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const response = await Users.findByEmail(email);
    if (!response) {
      return res.status(401).json({
        status: 401,
        error: "Invalid Credentials"
      });
    }
    const isPasswordValid = await UserController.verifyPassword(
      password,
      response.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        error: "Invalid Credentials"
      });
    }
    const token = Authorization.generateToken(response);
    return res.status(200).json({
      status: 200,
      data: {
        token,
        user: UserController.getUserobj(response)
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
      firstname: data.firstname,
      lastname: data.lastname,
      type: data.type,
      isAdmin: data.isAdmin,
      created_at: data.createdAt,
      modified_at: data.modifiedAt
    };
  }
}

export default UserController;