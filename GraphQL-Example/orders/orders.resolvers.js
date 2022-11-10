const ordersModel = require('./orders.models');

module.exports = {
    Query: {
        orders: () => {
            return ordersModel.getAllOrders();
        },
    }
}