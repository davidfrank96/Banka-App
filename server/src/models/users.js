
import hashPassword from '../helpers/hashPassword';
import db from './index';

/**
 * @exports
 * @class User
 */
class User {
  /**
       * @param {*} data
       * @memberof User
       * @returns { object } office object
       */
  
  create(req, data) {
    const text = `INSERT INTO
        users(first_name, last_name, email, type, is_admin, password, created_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
    const {
      first_name, last_name, email, type, is_admin, password, passwordCofirm,
    } = data;
    const newPassword = hashPassword(password, 10);
    const user = [
      first_name, last_name, email.toLowerCase(), type, is_admin, newPassword, new Date(),
    ];
    const response = db.query(text, user);
    return response;
  }

  find(key) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const response = db.query(query, [key]);
    return response;
  }

  findById(id) {
    const query = 'SELECT * FROM users WHERE id=$1';
    const response = db.query(query, [id]);
    return response;
  }
}

export default new User();

// Object gotten from Olawale Aladeusi post on Codementor
