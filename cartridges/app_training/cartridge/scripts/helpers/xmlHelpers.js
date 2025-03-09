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