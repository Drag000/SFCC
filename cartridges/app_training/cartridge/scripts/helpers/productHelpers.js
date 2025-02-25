'use strict';

var baseProductHelpers = require('*/cartridge/scripts/helpers/productHelpers');

function calculatePercentageOff(standardPrice, salePrice) {

    var discountPercentage = (((standardPrice - salePrice) / standardPrice) * 100);

    return discountPercentage;
};

// Extend the base module with your custom function
module.exports = Object.assign({}, baseProductHelpers, {
    calculatePercentageOff: calculatePercentageOff
});