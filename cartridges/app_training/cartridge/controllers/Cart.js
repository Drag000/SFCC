'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('AddProduct', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Transaction = require('dw/system/Transaction');
    var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
    var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var URLUtils = require('dw/web/URLUtils')
    var cartEmailHelpers = require('*/cartridge/scripts/helpers/cartEmailHelpers');
    var quantity = parseInt(req.form.quantity, 10);
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    var customer = req.currentCustomer;
    var productId = req.form.pid;

    if (currentBasket) {
        Transaction.wrap(function () {
            var result = cartHelper.addProductToCart(currentBasket, productId, quantity);

            if (!result.error) {
                cartHelper.ensureAllShipmentsHaveMethods(currentBasket);
                basketCalculationHelpers.calculateTotals(currentBasket);

                // Send email notification if customer is logged in
                if (customer.profile) {
                    var product = ProductMgr.getProduct(productId);
                    var protocol = req.https ? 'https://' : 'http://';
                    var host = req.host;
                    var baseURL = protocol + host;
                    var imageURL = product.getImage('large', 0).getURL();
                    var productImageURL = baseURL + imageURL;

                    var productURL = URLUtils.abs('Product-Show', 'pid', product.ID).toString();
                    
                    cartEmailHelpers.sendCartEmailNotification(customer, product, quantity, productURL, productImageURL);
                }
            }
        });
    }

    next();
});

module.exports = server.exports();