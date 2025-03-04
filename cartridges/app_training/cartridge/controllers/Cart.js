'use strict';

var server = require('server');
server.extend(module.superModule);



server.append('Show', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Site = require('dw/system/Site');
    var currentBasket = BasketMgr.getCurrentBasket();
    var warninigMessage;

    var cartTotal = currentBasket.totalGrossPrice.value;
    var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');

    if (cartTotal > cartTotalThreshold) {
        warninigMessage = 'Your cart total exceeds $' + cartTotalThreshold + '!';
    }

    res.setViewData({ warninigMessage: warninigMessage });

    return next();
});



// server.append('RemoveProductLineItem', function (req, res, next) {
//     var BasketMgr = require('dw/order/BasketMgr');
//     var Site = require('dw/system/Site');
//     var currentBasket = BasketMgr.getCurrentBasket();
//     var warninigMessage;
//     var Transaction = require('dw/system/Transaction');
//     var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');


//     // var cartTotal = currentBasket.totalGrossPrice.value;
//     // var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');

//     // var viewData = res.getViewData();

//     if (currentBasket) {
//         // Recalculate the cart total after removing a product
//         Transaction.wrap(function () {
//             // Call the basket calculation logic to update totals
//             basketCalculationHelpers.calculateTotals(currentBasket);

//             var cartTotal = currentBasket.totalGrossPrice.value;
//             var cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold');

//             // Compare the recalculated cart total with the threshold
//             if (cartTotal > cartTotalThreshold) {
//                 warninigMessage = 'Your cart total exceeds $' + cartTotalThreshold + '!';
//             } else {
//                 warninigMessage = 'ASD';
//             }
//         });
//     }


//     // if (cartTotal < cartTotalThreshold) {
//     //     warninigMessage = 'asd';
//     // }

//     res.setViewData({ warninigMessage: warninigMessage });

//     return next();
// });

module.exports = server.exports();