/* eslint-disable no-console */
import pool from './index';
import hashPassword from '../helpers/hashPassword';

pool.on('connect', () => {
    console.log('Connected to the database');
});

const queryString = `
    INSERT INTO users ("first_name", "last_name", email, password, type, "is_admin") 
    VALUES ('Frank', 'Frank', 'frank@gmail.com', '${hashPassword('password')}', 'staff', true),
         ('John', 'Doe', 'john@gmail.com', '${hashPassword('password')}', 'client', false);
    
`;

pool.query(queryString)
    .then((res) => {
        console.log(res);
        pool.end();
    }).catch((err) => {
        console.log(err);
        pool.end();
    });
