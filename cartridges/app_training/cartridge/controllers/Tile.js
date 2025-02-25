'use strict';
 
var server = require('server');
var baseProductHelpers = require('*/cartridge/scripts/helpers/productHelpers');
 
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var discountPercentage = null;
    
    
    discountPercentage = baseProductHelpers.calculatePercentageOff(100, 70);
        
    res.setViewData({
        discountPercentage: discountPercentage
    });
    
    return next();
})

module.exports = server.exports(); 



// var discountPercentage = null;
    
// if (product.price.sales) {
//     print(product.price.sales)  
// }