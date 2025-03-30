'use strict';

var server = require('server');
var productSearchService = require('*/cartridge/scripts/services/ProductSearchService');

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