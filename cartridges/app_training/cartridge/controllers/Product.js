'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');

server.extend(module.superModule);

/**
* Appends a 'Show' route to the server that retrieves and displays products from the same category
* as the specified product. The function fetches the product using its ID from the query string,
* determines its primary category, and then searches for other products within the same category.
* A maximum of four products, excluding the specified product, are retrieved and added to the view data.
*
* @param {Object} req - The server request object containing the query string with the product ID.
* @param {Object} res - The server response object used to set the view data with related products.
* @param {Function} next - The next middleware function in the server's request-response cycle.
*/
server.append('Show', function (req, res, next) {
    try {
        var productId = req.querystring.pid;
        if (!productId) {
            throw new Error('Product ID is missing from the request.');
        }

        var product = ProductMgr.getProduct(productId);
        if (!product) {
            throw new Error('Product not found.');
        }

        var primaryCategory = product.primaryCategory;
        if (!primaryCategory) {
            throw new Error('Primary category not found for the product.');
        }

        var categoryId = primaryCategory.ID;

        // Initialize ProductSearchModel
        var productSearch = new ProductSearchModel();
        productSearch.setCategoryID(categoryId);
        productSearch.search();

        // Get search results
        var searchHits = productSearch.getProductSearchHits();
        var productsInSameCategory = [];
        var maxProducts = 4;
        var count = 0;

        while (searchHits.hasNext() && count < maxProducts) {
            var productSearchHit = searchHits.next();
            var suggestedProductID = productSearchHit.getProductID();
            if (suggestedProductID === productId) {
                continue;
            }

            productsInSameCategory.push(suggestedProductID);
            count++;
        }

        // Add the products to the view data
        res.setViewData({
            productsInSameCategory: productsInSameCategory,
        });
    } catch (error) {
        // Log the error and set an error message in the view data
        var Logger = require('dw/system/Logger');
        Logger.error('Error in Product-Show: {0}', error.message);

        res.setViewData({
            errorMessage: 'An error occurred while retrieving related products. Please try again later.'
        });
    }

    return next();
});

module.exports = server.exports();