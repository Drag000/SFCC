var ProductMgr = require('dw/catalog/ProductMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var XMLStreamWriter = require('dw/io/XMLStreamWriter');
var Status = require('dw/system/Status');
var xmlHelpers = require('*/cartridge/scripts/helpers/xmlHelpers');

var XML_NAMESPACE = 'http://www.demandware.com/xml/impex/catalog/2006-10-31';
var CATALOG_ID = 'storefront-catalog-m-en';

function execute(args) {
    var brandName = args.brandName;
    var categoryID = args.categoryID;
    var category = CatalogMgr.getCategory(categoryID);

    if (!category) {
        throw new Error('Category not found: ' + categoryID);
    }

    var products = ProductMgr.queryAllSiteProducts();
    var xmlFile = new File(File.IMPEX + '/src/assignProducts.xml');
    var fileWriter = null;
    var xmlWriter = null;

    try {
        fileWriter = new FileWriter(xmlFile);
        xmlWriter = new XMLStreamWriter(fileWriter);

        xmlWriter.writeStartDocument();

        while (products.hasNext()) {
            var product = products.next();
            if (product.isMaster() && product.brand && product.brand.equalsIgnoreCase(brandName)) {
                xmlHelpers.writeCategoryAssignment(xmlWriter, categoryID, product.ID, XML_NAMESPACE, CATALOG_ID);
            }
        }

        xmlWriter.writeEndDocument();
    } catch (e) {
        return new Status(Status.ERROR, 'ERROR', e.message);
    } finally {
        if (xmlWriter) xmlWriter.close();
        if (fileWriter) fileWriter.close();
        if (products) products.close();
    }

    return new Status(Status.OK);
}


module.exports = {
    execute: execute
};