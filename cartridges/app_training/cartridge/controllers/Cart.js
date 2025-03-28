'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');

server.extend(module.superModule);

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