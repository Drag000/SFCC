'use strict';

/**
 * Sends an email notification to the customer when a product is added to the cart.
 * @param {Object} customer - The current customer object.
 * @param {Object} product - The product object that was added to the cart.
 * @param {number} quantity - The quantity of the product added to the cart.
 */
function sendCartEmailNotification(customer, product, quantity, productURL, productImageURL) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Resource = require('dw/web/Resource');
    var customerEmail = customer.profile.email;
    var customerFirstName = customer.profile.firstName;

    var emailObj = {
        to: customerEmail,
        subject: Resource.msg('subject.order.confirmation.email', 'order', null),
        from: 'no-reply@yourstore.com',
        type: emailHelpers.emailTypes.orderConfirmation
    };

    var template = 'cartEmailNotification';
    
    var context = {
        customerFirstName: customerFirstName,
        productName: product.name,
        productPrice: product.priceModel.price.value,
        productCurrency: product.priceModel.price.currencyCode,
        productDescription: product.shortDescription,
        quantity: quantity,
        productImageURL: productImageURL,
        productURL: productURL,
    };

    emailHelpers.sendEmail(emailObj, template, context);
}


module.exports = {
    sendCartEmailNotification: sendCartEmailNotification,
};