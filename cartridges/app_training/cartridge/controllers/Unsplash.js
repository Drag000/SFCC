'use strict';

var server = require('server');
var unsplashService = require('*/cartridge/scripts/services/UnsplashService');


/**
* Handles the request to retrieve images from the Unsplash service and renders the response.
* 
* This function makes a call to the Unsplash service to fetch images. If the service call is 
* successful, it renders the images using the 'unsplash/images' template. In case of failure, 
* it sets the response status code to 500 and returns a JSON object with an error message.
* 
* @param {Object} req - The request object containing the HTTP request information.
* @param {Object} res - The response object used to send the HTTP response.
* @param {Function} next - The next middleware function in the stack.
*/
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