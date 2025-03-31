'use strict';
 
var server = require('server');
var PageMgr = require('dw/experience/PageMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');
 
server.extend(module.superModule);

/**
* Appends the 'Show' route to the server, rendering a page using Page Designer if applicable.
*
* This function retrieves a category based on the category ID from the request query string.
* If the category has a Page Designer page ID and the corresponding page is visible, it renders
* the page using the Page Manager. Otherwise, it proceeds to the next middleware in the chain.
*
* @param {Object} req - The server request object containing the query string parameters.
* @param {Object} res - The server response object used to send responses to the client.
* @param {Function} next - The next middleware function in the server's request-response cycle.
* @returns {undefined} - The function does not return a value but may render a page or call the next middleware.
*/
server.append('Show', function (req, res, next) {
    var catId = req.querystring.cgid;
    var category = CatalogMgr.getCategory(catId);
    var pageDesignerID = (category && 'pageDesignerPageID' in category.custom) ? category.custom.pageDesignerPageID : null;
    var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;
    
    if (pageDesigner && pageDesigner.isVisible()) {
        return response.writer.println(PageMgr.renderPage(pageDesigner.ID, ''));
    }
    
    return next();
});

module.exports = server.exports();