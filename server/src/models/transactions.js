/* eslint-disable radix */
import accountData from '../../data/accounts';
import AccountModel from '../models/accounts';

/**
 * @exports
 * @class Account
 */
class Transaction {
  /**
   * Creates an instance of an Account.
   * @memberof Transaction
   * @param { object } data
   */
  constructor() {
    this.accounts = accountData;
  }

  credit(accountNumber, data) {
    const account = AccountModel.findByNumber(accountNumber);
    const index = this.accounts.indexOf(account);
    this.accounts[index].balance += parseInt(data.amount);

    return this.accounts[index];
  }
}

export default new Transaction();    