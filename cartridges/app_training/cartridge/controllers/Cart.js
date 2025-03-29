'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');

server.extend(module.superModule);

/**
* Appends a 'Show' route to the server, which checks the current basket's total
* against a predefined threshold and sets a warning message if the total exceeds
* this threshold. The warning message and threshold are then passed to the view data.
*
* @param {Object} req - The request object provided by the server
* @param {Object} res - The response object provided by the server
* @param {Function} next - The next middleware function in the stack
* @returns {void} - The function does not return a value, but passes control to the next middleware
*/
server.append('Show', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();
    var warninigMessage;

    var cartTotal = currentBasket.totalGrossPrice.value;
    var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');

    if (cartTotal > cartTotalThreshold) {
        warninigMessage = 'Your cart total exceeds $' + cartTotalThreshold + '!';
    }

    res.setViewData({ 
        warninigMessage: warninigMessage,
        cartTotalThreshold: cartTotalThreshold
    });

    return next();
});

module.exports = server.exports();