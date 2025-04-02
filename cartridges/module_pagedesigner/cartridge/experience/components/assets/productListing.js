'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');


/**
* Renders a product listing component based on the provided context.
*
* This function generates a model containing a list of product IDs, which is then used to render
* a product listing template. The products can be sourced either from a specified category or
* directly from a list of product IDs provided in the context content.
*
* @param {Object} context - The context object containing content information for rendering.
* @param {Object} context.content - The content object within the context.
* @param {dw.catalog.Category} [context.content.category] - The category object from which products are to be listed.
* @param {string} [context.content.productids] - A comma-separated string of product IDs to be listed if no category is specified.
* @returns {string} The rendered HTML text of the product listing component.
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