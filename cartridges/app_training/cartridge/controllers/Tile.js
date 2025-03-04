'use strict';

var server = require('server');
var baseProductHelpers = require('*/cartridge/scripts/helpers/productHelpers');

server.extend(module.superModule);

/**
 * Appends a 'Show' route to the server that calculates and sets the discount percentage for a product.
 *
 * This function retrieves the product data from the response view data, calculates the discount
 * percentage based on the sales and list prices, and sets this discount percentage back into the
 * view data. The function then proceeds to the next middleware in the chain.
 *
 * @param {Object} req - The server request object.
 * @param {Object} res - The server response object, which contains view data.
 * @param {Function} next - The next middleware function in the server's request-response cycle.
 *
 * @returns {void} - This function does not return a value but modifies the response view data.
 */
server.append('Show', function (req, res, next) {
    var discountPercentage = null;

    var product = res.getViewData().product;

    if (product.price.sales && product.price.list) {
        discountPercentage = baseProductHelpers.calculatePercentageOff(product.price.list.value, product.price.sales.value);
    }

    res.setViewData({ discountPercentage: discountPercentage });

    return next();
})

module.exports = server.exports();

