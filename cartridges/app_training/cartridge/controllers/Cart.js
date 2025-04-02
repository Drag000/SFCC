'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');

server.extend(module.superModule);

/**
* Appends the 'Show' route to the server, which checks the current basket's total gross price
* against a predefined threshold and sets a warning message if the threshold is exceeded.
*
* @param {Object} req - The request object, representing the HTTP request.
* @param {Object} res - The response object, used to send data back to the client.
* @param {Function} next - The next middleware function in the stack.
* @returns {Function} - Calls the next middleware function in the stack.
*
* @description This function retrieves the current basket using the BasketMgr, calculates the total
* gross price of the cart, and compares it to a custom preference value 'cartTotalThreshold' from
* the Site object. If the cart total exceeds the threshold, a warning message is generated and
* added to the view data. The function then proceeds to the next middleware in the chain.
*/
server.append('Show', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();
    var warninigMessage;
    
    if (currentBasket && currentBasket.totalGrossPrice) {
        var cartTotal = currentBasket.totalGrossPrice.value;
        var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');
    
        if (cartTotal > cartTotalThreshold) {
            warninigMessage = 'Your cart total exceeds $' + cartTotalThreshold + '!';
        }
    
        res.setViewData({ 
            warninigMessage: warninigMessage,
            cartTotalThreshold: cartTotalThreshold
        });
    }
    return next();
});

module.exports = server.exports();