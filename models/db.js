
const { QueryTypes, Sequelize, DataTypes, Op } = require('sequelize');
const { log } = require('../logger');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE
});


//sync and test connection
const connect = async () => {
  try {
    //lazy -- comment / uncomment as necessary
    if(process.env.NODE_ENV === 'development') {
      // await sequelize.sync({alter: true});    
      // await sequelize.sync({force: true});    
      sequelize.options.logging = msg => log.db(msg);
      // sequelize.options.logging = false;
    }
    //assume seeding so turn off unnecessary logging
    if(process.argv[2] === '--generate') {
      sequelize.options.logging = false;
    }
    await sequelize.authenticate();
      log.info(`Connection to DB [${process.env.DB_NAME || process.env.DB_STORAGE}] was successful...`);
  } catch (err) {
    log.error('Unable to connect to the database:', err);
  } 
};
connect();


const db = {};
db.sequelize = sequelize;
db.Op = Op;
db.Sequelize = Sequelize; 
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;

module.exports = db;
