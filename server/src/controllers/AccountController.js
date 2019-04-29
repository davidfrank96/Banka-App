import AccountModel from '../models/accounts';
import User from '../models/users';
import TransactionModel from '../models/transactions';
import validateParam from '../helpers/validateParam';

class AccountController {
  /**
  * @static
  * @description this method queries the database with the create model to create a new User
  * @param {object} req - Request object
  * @param {object} res - Response object
  * @returns {object} Json object
  * @memberof Controller
  */
  static async createAccount(req, res) {
    try {
      const response = await AccountModel.create(req.body, req);
      return res.status(201).json({
        status: res.statusCode,
        message: 'Account created successfully',
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error,
      });
    }
  }

  /**
   * @static
   * @description this method queries the database with the findNumber model
   *  to find a single account number using the params.id
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async update(req, res) {
    try {
      validateParam(res, req.params.id);
      const { rows } = await AccountModel.findByNumber(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account Not Found',
        });
      }
      const response = await AccountModel.update(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        message: 'Account details updated successfully',
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

/**
 * @static
 * @description this method queries the database to delete a
 *  particular user using the findNumber model to remove a user
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} Json
 * @memberof Controller
 */
  static async delete(req, res) {
    try {
      validateParam(res, req.params.id);
      const { rows } = await AccountModel.findByNumber(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account Not Found',
        });
      }
      await AccountModel.delete(req.params.id);
      return res.status(200).json({
        status: 200,
        message: 'Account successfully deleted',
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error,
      });
    }
  }

  /**
   *
   * @static
   * @description this method queries the database  to get
   * the transaction history of an account
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async transactionHistory(req, res) {
    try {
      const { rows } = await TransactionModel.getAll(req);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      return res.json({
        status: 200,
        data: rows,
      }).status(200);
    } catch (error) {
      return res.json({
        status: 500,
        error,
      }).status(500);
    }
  }

  /**
   *
   * @static
   * @description this method queries the database to get a single User by using the request.id
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async getAccountDetails(req, res) {
    try {
      const { rows } = await AccountModel.findByNumber(req.params.id);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      return res.json({
        status: 200,
        data: rows[0],
      }).status(200);
    } catch (error) {
      return res.json({
        status: 500,
        error,
      }).status(500);
    }
  }
 
  /**
   *
   * @static
   * @description this calls a method Account.findByQuery which carries
   *  an agument request object that queries the db to get all the  account details
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async getAllAccountDetails(req, res) {
    try {
      if (req.query.status) {
        const { rows, rowCount } = await AccountModel.findByQuery(req);
        return res.json({
          status: 200,
          data: rows,
          rowCount,
        }).status(200);
      }
      const { rows, rowCount } = await AccountModel.findAll();

      return res.json({
        status: 200,
        data: rows,
        rowCount,
      }).status(200);
    } catch (error) {
      return res.json({
        status: 500,
        error,
      }).status(500);
    }
  }

  static getTransactionObj(data) {
    return {
      transactionId: data.id,
      accountNumber: data.accountnumber,
      amount: data.amount,
      cashier: data.cashier,
      transactionType: data.type,
      accountBalance: data.newbalance,
    };
  }

  /**
  *
  * @static
  * @description this method quries the database to get a user by
  * his/her email address using the findByOwner model
  * @param {object} req - Request object
  * @param {object} res - Response object
  * @returns {object} Json
  * @memberof Controller
  */
  static async accounts(req, res) {
    try {
      const { email } = req.params;
      const response = await User.find(email);
      if (!response.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Email does not exist in out record',
        });
      }

      const { rows } = await AccountModel.findByOwner(email);

      return res.json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.json({
        status: 500,
        error,
      }).status(500);
    }
  }
}

export default AccountController;
