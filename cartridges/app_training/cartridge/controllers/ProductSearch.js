'use strict';

var server = require('server');
var productSearchService = require('*/cartridge/scripts/services/ProductSearchService');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.get('Show', cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var result = productSearchService.call();
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
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();