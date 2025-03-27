'use strict';

/**
* Calculates the percentage discount given the standard price and the sale price.
*
* This function computes the percentage by which the sale price is reduced from the standard price.
* It is useful for determining the discount rate applied to a product.
*
* @param {number} standardPrice - The original price of the product before any discounts.
* @param {number} salePrice - The reduced price of the product after the discount is applied.
* @returns {number} The percentage discount applied, represented as a number.
*/
function calculatePercentageOff(standardPrice, salePrice) {

    var discountPercentage = (((standardPrice - salePrice) / standardPrice) * 100);

    return discountPercentage;
}

module.exports = {
    calculatePercentageOff: calculatePercentageOff
};