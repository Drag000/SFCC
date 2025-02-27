'use strict';

var server = require('server');
var baseProductHelpers = require('*/cartridge/scripts/helpers/productHelpers');

server.extend(module.superModule);

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

