import { Sequelize } from 'sequelize';
import { dbName, dbUser, dbPwd } from './configDb.js';
import pg from 'pg';

console.log('Opening database connection');

const dbConfig = {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
};

// Create a connection to the default database (usually postgres)
const defaultDb = new Sequelize('postgres', dbUser, dbPwd, dbConfig);

// Create the database if it doesn't exist
await defaultDb.query(`CREATE DATABASE "${dbName}"`)
  .then(() => console.log(`Database ${dbName} created successfully`))
  .catch(error => {
    if (error.name === 'SequelizeDatabaseError' && error.original.code === '42P04') {
      console.log(`Database ${dbName} already exists`);
    } else {
      console.error('Error creating database:', error);
    }
  });

// Close the connection to the default database
await defaultDb.close();

// Connect to the actual database
export const db = new Sequelize(dbName, dbUser, dbPwd, dbConfig);
