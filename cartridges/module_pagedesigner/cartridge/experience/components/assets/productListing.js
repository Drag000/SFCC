'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');

/**
 * Render logic for the assets.productListing component.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var category = content.category;

    var products = [];

    if (category) {
        // Initialize ProductSearchModel
        var productSearch = new ProductSearchModel();
        productSearch.setCategoryID(category.ID);
        productSearch.search();

        // Get search results
        var searchHits = productSearch.getProductSearchHits();
        var maxProducts = 4;
        var count = 0;

        while (searchHits.hasNext() && count < maxProducts) {
            var productSearchHit = searchHits.next();
            var suggestedProductID = productSearchHit.getProductID();
            products.push(suggestedProductID);
            count++;
        }

    } else if (content.productids) {
        // Get products by IDs
        var productIDs = content.productids.split(', ').map(function (id) { return id.trim(); });
        productIDs.forEach(function (productId) {
            products.push(productId);
        });
    }

    model.products = products;

    return new Template('experience/components/assets/productListing').render(model).text;
};