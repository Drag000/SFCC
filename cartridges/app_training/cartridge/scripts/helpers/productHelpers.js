'use strict';

var baseProductHelpers = require('app_storefront_base/cartridge/scripts/helpers/productHelpers');

/**
 * Calculates the percentage discount between a standard price and a sale price.
 *
 * This function computes the discount percentage by comparing the standard price
 * with the sale price. The result is the percentage by which the sale price is
 * lower than the standard price.
 *
 * @param {number} standardPrice - The original price of the product before any discounts.
 * @param {number} salePrice - The discounted price of the product.
 *
 * @returns {number} - The discount percentage, representing how much cheaper the sale price is compared to the standard price.
 */
function calculatePercentageOff(standardPrice, salePrice) {

    var discountPercentage = (((standardPrice - salePrice) / standardPrice) * 100);

    return discountPercentage;
}

// Extend the base module with your custom function
module.exports = Object.assign({}, baseProductHelpers, {
    calculatePercentageOff: calculatePercentageOff
});
