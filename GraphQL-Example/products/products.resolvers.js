const productsModel = require('./products.models');

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts();
        },
    }
}