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