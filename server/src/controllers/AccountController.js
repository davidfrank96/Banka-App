import AccountModel from '../models/accounts';
import TransactionModel from '../models/transactions';


class AccountController {
  /**
   * @static
   * @description this calls a method from the AccountModel create
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
        data: response.rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error
      });
    }
  }

  /**
   * @static
   * @description
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async update(req, res) {
    try {
      const { rows } = await AccountModel.findByNumber(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account Not Found'
        });
      }
      const response = await AccountModel.update(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        message: 'Account details updated successfully',
        data: response.rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   *
   * @static
   * @description this calls a method Account.findByQuery which carries
   *  an agument request object that queries the db
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async getAllAccountDetails(req, res) {
    try {
      if (req.query.status) {
        const { rows, rowCount } = await AccountModel.findByQuery(req);
        return res
          .json({
            status: 200,
            data: rows,
            rowCount
          })
          .status(200);
      }
      const { rows, rowCount } = await AccountModel.findAll();

      return res
        .json({
          status: 200,
          data: rows,
          rowCount
        })
        .status(200);
    } catch (error) {
      console.log(error);
      return res
        .json({
          status: 500,
          error
        })
        .status(500);
    }
  }

  /**
   *
   * @static
   * @description
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async getAccountDetails(req, res) {
    try {
      const { rows } = await AccountModel.findByNumber(req.params.id);

      if (!rows) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found'
        });
      }

      return res
        .json({
          status: 200,
          data: rows[0]
        })
        .status(200);
    } catch (error) {
      return res
        .json({
          status: 500,
          error
        })
        .status(500);
    }
  }

  /**
   *
   * @static
   * @description
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async transactionHistory(req, res) {
    try {
      const { rows } = await TransactionModel.getAll(req);

      if (!rows) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found'
        });
      }

      return res
        .json({
          status: 200,
          data: rows
        })
        .status(200);
    } catch (error) {
      return res
        .json({
          status: 500,
          error
        })
        .status(500);
    }
  }

  /**
   *
   * @static
   * @description
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static async accounts(req, res) {
    try {
      const { email } = req.params;
      const { rows } = await AccountModel.findByOwner(email);

      return res.json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res
        .json({
          status: 500,
          error
        })
        .status(500);
    }
  }

  /**
   * @static
   * @description
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof Controller
   */
  static getTransactionObj(data) {
    return {
      transactionId: data.id,
      accountNumber: data.accountnumber,
      amount: data.amount,
      cashier: data.cashier,
      transactionType: data.type,
      accountBalance: data.newbalance
    };
  }

  /**
 * @static
 * @description
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} Json
 * @memberof Controller
 */
  static async delete(req, res) {
    try {
      const { rows } = await AccountModel.findByNumber(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account Not Found'
        });
      }
      await AccountModel.delete(req.params.id);
      return res.status(200).json({
        status: 200,
        message: 'Account successfully deleted'
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error
      });
    }
  }
}

export default AccountController;
