'use strict';

var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Return an object containing the scaled image for mobile, table and desktop.  Other included image details
 * are: alt text, focalPoint x, focalPoint y.
 *
 * @param {Image} image the image for which to be scaled.
 * @param {Object} The object containing the scaled image
 *
 * @return {string} The Absolute url
 */
function getScaledImage (image) {
    return {
        src: {
            mobile: ImageTransformation.url(image, { device: 'mobile' }),
            desktop: ImageTransformation.url(image, { device: 'desktop' })
        },
        alt: image.file.getAlt(),
        focalPointX: (image.focalPoint.x * 100) + '%',
        focalPointY: (image.focalPoint.y * 100) + '%'
    };
};

module.exports = {
    getScaledImage,
}
