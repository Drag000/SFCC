'use strict';
 
var server = require('server');
 
server.extend(module.superModule);
 
server.append('Show', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var currentBasket = BasketMgr.getCurrentBasket();
    
    var cartTotal = currentBasket.totalGrossPrice.value;
    
    // var warninigMessage = '123'
    // res.setViewData({warninigMessage:warninigMessage});
    
    
    if (cartTotal > 200) {
        var warninigMessage = 'Your cart exeeds $200!';
        
        
        
        res.setViewData({warninigMessage:warninigMessage});
    }
    
    return next();
});

module.exports = server.exports();