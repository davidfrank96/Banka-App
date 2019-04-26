/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
import db from './index';
import accountNumber from '../helpers/accountNumber';


/**
 * @exports
 * @class Account
 */
class Account {
    /**
       * @param {*} data
       * @memberof Account
       * @returns { object } account object
       */
    create(data, req) {
        const newAccount = [
            accountNumber(),
            req.user.id,
            data.type,
            'active',
            data.balance,
            new Date(),
        ];

        const text = `INSERT INTO
        accounts(accountNumber, owner, type, status, balance, created_at)
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;

        const response = db.query(text, newAccount);
        return response;
    }

    findByNumber(number) {
        const text = 'SELECT * FROM accounts WHERE accountnumber=$1';
        const response = db.query(text, [number]);
        return response;
    }

    findAll() {
        const text = 'SELECT * FROM accounts ORDER BY id ASC';
        const response = db.query(text);
        return response;
    }

    findByQuery(req) {
        const text = 'SELECT * FROM accounts WHERE status=$1';
        const response = db.query(text, [req.query.status]);
        return response;
    }

    findByOwner(email) {
        const text = `SELECT accounts.id, accounts.created_at, accounts.accountnumber::FLOAT,
      accounts.type, accounts.status, accounts.balance::FLOAT FROM accounts
      JOIN users ON accounts.owner=users.id
      WHERE users.email=$1
      ORDER BY accounts.id ASC`;
        const response = db.query(text, [email]);
        return response;
    }

    /**
       * @param {*} id
       * @param {*} data
       * @returns { Object }
       * @memberof Account
       */
    update(accountNumber, data) {
        const text = `UPDATE accounts
      SET status=$1 WHERE accountnumber=$2 returning *`;
        const values = [
            data.status,
            accountNumber,
        ];
        const response = db.query(text, values);
        return response;
    }

    updateAmount(accountNumber, amount) {
        const text = `UPDATE accounts
      SET balance=$1 WHERE accountnumber=$2 returning *`;
        const values = [
            amount,
            accountNumber,
        ];
        const response = db.query(text, values);
        return response;
    }

    /**
       * @param {*} id
       * @returns {}
       * @memberof Account
       */
    delete(accountNumber) {
        const deleteQuery = 'DELETE FROM accounts WHERE accountnumber=$1 returning *';
        db.query(deleteQuery, [accountNumber]);
    }
}

export default new Account();

// Object gotten from Olawale Aladeusi post on Codementor