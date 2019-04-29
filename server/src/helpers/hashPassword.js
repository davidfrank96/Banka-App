import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

const saltRounds = parseInt(process.env.SALT, 10);
/**
 * @function hashPassword
 * @memberof UserController
 * @param {string} password
 * @param {integer} salt
 * @returns
 */
const hashPassword = password => {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

export default hashPassword;
