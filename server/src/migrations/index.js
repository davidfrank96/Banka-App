import { Pool } from 'pg';
import { config } from 'dotenv';
import configAll from '../../config/database_config';

config();
const env = process.env.NODE_ENV;
const connect = configAll[env];

const { connectionString } = connect;

console.log(connectionString);
const pool = new Pool({
    connectionString,
});

export default pool;
