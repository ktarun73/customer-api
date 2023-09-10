const Sequelize = require('sequelize');

const connection = new Sequelize("test_database","root","root",{
    dialect : "mysql",
    host : "localhost",
});

module.exports = connection;