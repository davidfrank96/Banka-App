/* eslint-disable no-console */
import pool from './index';

pool.on('connect', () => {
    console.log('Connected to the database');
});

const queryText = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        type VARCHAR(128) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        password VARCHAR(124) NOT NULL,
        created_at TIMESTAMP,
        modified_at TIMESTAMP DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL PRIMARY KEY,
        accountNumber BIGINT UNIQUE NOT NULL,
        owner INTEGER REFERENCES users(id) NOT NULL,
        type VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        balance FLOAT(1) NOT NULL,
        created_at TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL,
        type VARCHAR(128),
        accountNumber BIGINT REFERENCES accounts(accountNumber),
        cashier INTEGER REFERENCES users(id) NOT NULL,
        amount FLOAT(1) NOT NULL,
        oldBalance FLOAT(1) NOT NULL,
        newBalance FLOAT(1) NOT NULL,
        created_at TIMESTAMP
    );
`;

pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    }).catch((err) => {
        console.log(err);
        pool.end();
    });
