'use strict';

var server = require('server');
var unsplashService = require('*/cartridge/scripts/services/UnsplashService');

/**
* Handles the 'Show' route to fetch and display images from the Unsplash service.
*
* This function makes a call to the Unsplash service to retrieve a list of photos.
* If the service call is successful, it renders the images using the 'unsplash/images' template.
* If the service call fails, it responds with a 500 status code and an error message.
*
* @param {Object} req - The server request object.
* @param {Object} res - The server response object.
* @param {Function} next - The next middleware function in the stack.
*/
server.get('Show', function (req, res, next) {
    var params = {
        endpoint: 'photos',
        page: 1,
    };
    
    var result = unsplashService.call(params);

    if (result.ok) {
        res.render('unsplash/images', { images: result.object });
    } else {
        res.setStatusCode(500);
        res.json({ error: 'Failed to retrieve images' });
    }
    next();
});

module.exports = server.exports();