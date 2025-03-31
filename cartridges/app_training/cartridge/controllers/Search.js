'use strict';
 
var server = require('server');
var PageMgr = require('dw/experience/PageMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');
 
server.extend(module.superModule);

/**
* Appends the 'Show' route to the server, which handles the display of a category page.
* If a Page Designer page is associated with the category and is visible, it renders the page.
* Otherwise, it proceeds to the next middleware in the chain.
*
* @param {Object} req - The server request object, containing query parameters and other request data.
* @param {Object} res - The server response object, used to send responses to the client.
* @param {Function} next - The next middleware function in the server's request-response cycle.
* @returns {void} - This function does not return a value. It either renders a page or calls the next middleware.
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