/* eslint-disable radix */
import accountData from '../../data/accounts';
import randomString from 'random-string';


/**
 * @exports
 * @class Account
 */
class Account {
    /**
     * Creates an instance of an Account.
     * @memberof Account
     * @param { object } data
     */
    constructor() {
        this.accounts = accountData;
    }

    /**
     * @param {*} data
     * @memberof Account
     * @returns { object } account object
     */
    create(data, req) {
        const newAccount = {
          id: this.accounts.length + 1,
          accountNumber: parseInt(
            randomString({
              length: 10,
              numeric: true,
              letters: false,
              special: false
            })
          ),
          firstName: data.firstName,
          lastName: data.lastName,
          owner: req.user.id,
          type: data.type,
          status: "active",
          balance: parseInt(data.balance) || 0,
          createdOn: new Date()
        };

        this.accounts.push(newAccount);
        return newAccount;
    }

    findByNumber(number) {
        return this.accounts.find(data => data.accountNumber === parseInt(number));
    }

    /**
    * @param {*} id
    * @param {*} data
    * @returns { Object }
    * @memberof Account
    */
    update(accountNumber, data) {
        const account = this.findByNumber(accountNumber);
        const index = this.accounts.indexOf(account);
        this.accounts[index].status = data.status || account.status;

        return this.accounts[index];
    }

    /**
     * @param {*} id
     * @returns {}
     * @memberof Account
     */
    delete(id) {
        const account = this.findByNumber(id);
        const index = this.accounts.indexOf(account);
        this.accounts.splice(index, 1);

        return {};
    }
}

export default new Account();