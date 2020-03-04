import { createPool } from 'mariadb';

export const pool = () => (
    createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_BASE,
        connectionLimit: 20
    })
);

let dbConnection = () => {
        console.log('connecting to db');
        return pool();
};

export default dbConnection;
