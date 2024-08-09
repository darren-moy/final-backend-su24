// Instantiate Sequelize connection to existing db 

import { Sequelize } from 'sequelize';
import {dbName, dbUser, dbPwd} from './configDb.js';

console.log('Opening database connection');

export const db = new Sequelize(dbName, dbUser, dbPwd, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

