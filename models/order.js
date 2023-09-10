const Sequelize = require('sequelize');
const connection = require('../util/database');

const Order = connection.define("order",{
    orderID : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    productName : {
        type : Sequelize.STRING,
        allowNull: false,
    }
});

const Customer = require('./customer'); // Assuming you have already created the Customer model
Order.belongsTo(Customer, {
  foreignKey: 'customerId',
  onDelete: 'CASCADE', // This will delete orders associated with a customer if the customer is deleted
});

module.exports = Order;