'use strict';

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var ProductFactory = require('*/cartridge/scripts/factories/product');
server.extend(module.superModule);


/**
 * Appends a 'Show' route to the server that retrieves a product by its ID
 * and finds up to four other products in the same category.
 *
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to set view data.
 * @param {Function} next - The next middleware function in the chain.
 *
 * This function expects a product ID to be passed as a query parameter.
 * It retrieves the product using the ProductMgr, then finds the primary
 * category of the product. Using the category ID, it initializes a
 * ProductSearchModel to search for other products in the same category.
 * It limits the results to a maximum of four products and adds them to
 * the view data for rendering.
 */
server.append('Show', function (req, res, next) {
    var productId = req.querystring.pid;
    var product = ProductMgr.getProduct(productId);

    if (product) {
        var primaryCategory = product.primaryCategory;
        if (primaryCategory) {
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
                if(suggestedProductID === productId) {
                    continue;
                }
                // var fullProduct = ProductMgr.getProduct(productID); 
                var fullProduct = ProductFactory.get({ pid: productSearchHit.getProduct().ID})
                if (fullProduct) {
                    productsInSameCategory.push(fullProduct);
                    count++;
                }
            }
            
            // Add the products to the view data
            res.setViewData({
                productsInSameCategory: productsInSameCategory,
            });
        }
    }

    return next();
});

module.exports = server.exports();

