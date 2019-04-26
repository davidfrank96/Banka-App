import { Pool } from 'pg';
import { config } from 'dotenv';
import configAll from '../../config/database_config';

config();
// const env = process.env.NODE_ENV;
const connect = process.env.TEST_DATABASE_URL;

// const { connectionString } = connect;

// console.log(connectionString);
const pool = new Pool({
    connectionString: connect,
});

export default pool;
