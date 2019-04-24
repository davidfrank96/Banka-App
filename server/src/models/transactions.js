/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
import AccountModel from "./accounts";
import db from "./index";

/**
 * @exports
 * @class Account
 */
class Transaction {
  find(id) {
    const text = "SELECT * FROM accounts WHERE accountnumber = $1";
    const response = db.query(text, [id]);
    return response;
  }

  credit(data) {
    const text = `INSERT INTO
        transactions(type, accountNumber, cashier, amount, oldBalance, newBalance, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;

    const response = db.query(text, data);
    return response;
  }

  getAll(req) {
    const findAllQuery = 'SELECT * FROM transactions WHERE accountnumber=$1 ORDER BY id DESC';
    const response = db.query(findAllQuery, [req.params.id]);
    return response;
  }

  debit(accountNumber, data, req) {
    const userDetails = this.find(accountNumber);
    const credit = [
      "debit",
      accountNumber,
      req.user.id,
      data.amount,
      userDetails.balance,
      parseFloat(userDetails.balance) - parseFloat(data.amount),
      new Date()
    ];

    const text = `INSERT INTO
        transactions(type, accountNumber, cashier, amount, oldBalance, newBalance, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;

    const response = db.query(text, credit);
    return response;
  }
}

export default new Transaction();

// Object gotten from Olawale Aladeusi post on Codementor
