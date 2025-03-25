'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.wayfinderAsset component.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var category = content.category;

    if (content.image) {
        model.image = {
            src: {
                mobile: ImageTransformation.url(content.image, { device: 'mobile', width: 300, height: 200, crop: 'fill' }),
                desktop: ImageTransformation.url(content.image, { device: 'desktop', width: 300, height: 200, crop: 'fill' })
            },
            alt: content.image.file.getAlt(),
            focalPointX: content.image.focalPoint.x * 100 + '%',
            focalPointY: content.image.focalPoint.y * 100 + '%'
        };
    }

    if (category) {
        model.url = URLUtils.url('Search-Show', 'cgid', category.ID);
    } else {
        model.url = URLUtils.url('Home-Show');
    }
    
    model.title = content.title;

    return new Template('experience/components/assets/wayfinderAsset').render(model).text;
};