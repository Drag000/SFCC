'use strict';

var server = require('server');
var unsplashService = require('*/cartridge/scripts/services/UnsplashService');

server.get('Show', function (req, res, next) {
    var result = unsplashService.call();

    if (result.ok) {
        res.render('unsplash/images', { images: result.object });
    } else {
        res.setStatusCode(500);
        res.json({ error: 'Failed to retrieve images' });
    }
    next();
});

module.exports = server.exports();