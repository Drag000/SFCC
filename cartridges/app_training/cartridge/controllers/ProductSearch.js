'use strict';

var server = require('server');
var productSearchService = require('*/cartridge/scripts/services/ProductSearchService');

/**
* Handles the 'Show' route for product search functionality.
* This function performs a product search using specified parameters and renders the results.
* If the search is successful, it renders the product IDs in the 'productsearch/results' template.
* If the search fails, it responds with a 500 status code and an error message.
*
* @param {Object} req - The request object representing the HTTP request.
* @param {Object} res - The response object used to send back the desired HTTP response.
* @param {Function} next - The next middleware function in the stack.
* @returns {Function} - Calls the next middleware function in the stack.
*/
server.get('Show', function (req, res, next) {
    var params = {
        endpoint: 'product_search',
        query: 'Sony',
        refine: 'cgid=electronics',
        count: 20,
        clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    
    var result = productSearchService.call(params);
    
    var productIDs = [];
    var SearchHits = result.object.hits
    
    Object.values(SearchHits).forEach(function (productSearchHit) {
        var suggestedProductID = productSearchHit.product_id;
        productIDs.push(suggestedProductID);
    });
    
    if (result.ok) {
        res.render('productsearch/results', { productIDs: productIDs });
    } else {
        res.setStatusCode(500);
        res.json({ error: 'Failed to retrieve products' });
    }
    return next();
});

module.exports = server.exports();