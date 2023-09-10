const Sequelize = require('sequelize'); //sequelize
const connection = require('../util/database'); //database 
 
const Customer = connection.define("customer",{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Customer;