/* eslint-disable radix */
import randomString from "random-string";
import AccountModel from "../models/accounts";
import TransactionModel from "../models/transactions";

class TransactionController {
  static async credit(req, res) {
    try {
      const { rows } = await AccountModel.findByNumber(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: "Account Not Found"
        });
      }
      const { amount } = req.body;
      const newBalance = parseFloat(rows[0].balance) + parseFloat(amount);
      const response = await AccountModel.updateAmount(
        req.params.id,
        newBalance
      );

      const transactionValues = [
        "credit",
        req.params.id,
        req.user.id,
        parseFloat(amount),
        parseFloat(rows[0].balance),
        parseFloat(response.rows[0].balance),
        new Date()
      ];
      const transaction = await TransactionModel.credit(transactionValues);
      return res.status(200).json({
        status: 200,
        data: TransactionController.getTransactionObj(transaction.rows[0])
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

  static async debit(req, res) {
    try {
      const { rows } = await AccountModel.findByNumber(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: "Account Not Found"
        });
      }
      const { amount } = req.body;
      const newBalance = parseFloat(rows[0].balance) - parseFloat(amount);
      if (rows[0].balance < amount) {
        return res
          .json({
            status: 400,
            error: "Insufficient balance to complete transaction"
          })
          .status(400);
      }
      const response = await AccountModel.updateAmount(
        req.params.id,
        newBalance
      );

      const transactionValues = [
        "debit",
        req.params.id,
        req.user.id,
        parseFloat(amount),
        parseFloat(rows[0].balance),
        parseFloat(response.rows[0].balance),
        new Date()
      ];
      const transaction = await TransactionModel.credit(transactionValues);
      return res.status(200).json({
        status: 200,
        data: TransactionController.getTransactionObj(transaction.rows[0])
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
  static async getTransaction(req, res) {
    try {
      const { rows } = await TransactionModel.findOne(req.params.id);

      if (!rows[0]) {
        return res.json({
          status: 404,
          error: 'Sorry, transaction does not exist',
        })
      }

      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
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
      accountBalance: data.newbalance
    };
  }
}

export default TransactionController;
