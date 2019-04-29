import pool from './index';
// import users from '../../data/users';
// import transactions from '../../data/transaction';
// import accounts from '../../data/accounts';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const queryText = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        type VARCHAR(128) DEFAULT 'client',
        is_admin BOOLEAN DEFAULT false,
        password VARCHAR(124) NOT NULL,
        created_at TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL PRIMARY KEY,
        accountNumber BIGINT UNIQUE NOT NULL,
        owner INTEGER REFERENCES users(id) NOT NULL,
        type VARCHAR(128) NOT NULL,
        status VARCHAR(128) DEFAULT 'active',
        balance NUMERIC(200, 2) DEFAULT 0.00 CONSTRAINT positive_balance CHECK (balance > -1),
        created_at TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL,
        type VARCHAR(128) NOT NULL,
        accountNumber BIGINT REFERENCES accounts(accountNumber),
        cashier INTEGER REFERENCES users(id) NOT NULL,
        amount FLOAT(1) NOT NULL,
        oldBalance FLOAT(1) NOT NULL,
        newBalance NUMERIC(200, 2) NOT NULL CHECK ("newbalance" > -1),
        created_at TIMESTAMP
    );
`;

// const seedTable = async (table, array) => {
//   await array.forEach(async (member) => {
//     const key = Object.keys(member);
//     const value = Object.values(member);
//     await pool.query(`insert into ${table} (${key}) values (${value})`);
//   });
// };

// const seedAllTables = async () => {
//   try {
//     await pool.query(queryText);
//     await seedTable('users', users);
//     await seedTable('accounts', accounts);
//     await seedTable('transactions', transactions);
//     console.log('Tables successfully seeded');
//   } catch (error) {
//     console.log(error);
//     console.log('Tables not seeded');
//   }
// };

// seedAllTables();

// jude olasohus

pool
  .query(queryText)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });
