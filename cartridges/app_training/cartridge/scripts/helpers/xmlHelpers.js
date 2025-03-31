
/**
* Writes a category assignment entry to an XML document using the provided XML writer.
*
* This function constructs an XML element representing a category assignment for a product
* within a specified catalog. It sets the necessary attributes for the catalog and category
* assignment elements, including the XML namespace, catalog ID, category ID, and product ID.
*
* @param {Object} xmlWriter - An instance of an XML writer used to generate the XML document.
* @param {string} categoryID - The unique identifier for the category to which the product is assigned.
* @param {string} productID - The unique identifier for the product being assigned to the category.
* @param {string} XML_NAMESPACE - The XML namespace to be used for the catalog element.
* @param {string} CATALOG_ID - The unique identifier for the catalog containing the category assignment.
*/
function writeCategoryAssignment(xmlWriter, categoryID, productID, XML_NAMESPACE, CATALOG_ID) {
    xmlWriter.writeStartElement('catalog');
    xmlWriter.writeAttribute('xmlns', XML_NAMESPACE);
    xmlWriter.writeAttribute('catalog-id', CATALOG_ID);
    xmlWriter.writeStartElement('category-assignment');
    xmlWriter.writeAttribute('category-id', categoryID);
    xmlWriter.writeAttribute('product-id', productID);
    xmlWriter.writeEndElement();
    xmlWriter.writeEndElement();
}

module.exports = {
    writeCategoryAssignment,
};