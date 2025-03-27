'use strict';

var server = require('server');
var discountHelpers = require('*/cartridge/scripts/helpers/discountHelpers');

server.extend(module.superModule);


/**
* Appends a 'Show' route to the server, calculating the discount percentage for a product
* and setting it in the view data.
*
* @param {Object} req - The request object, representing the HTTP request.
* @param {Object} res - The response object, used to send data back to the client.
* @param {Function} next - The next middleware function in the stack.
* 
* @description This function retrieves the product data from the response view data,
* calculates the discount percentage if both sales and list prices are available,
* and updates the view data with the calculated discount percentage.
*/
server.append('Show', function (req, res, next) {
    var discountPercentage = null;

    var product = res.getViewData().product;

    if (product.price.sales && product.price.list) {
        discountPercentage = discountHelpers.calculatePercentageOff(product.price.list.value, product.price.sales.value);
    }

    res.setViewData({ discountPercentage: discountPercentage });

    return next();
})

module.exports = server.exports();

