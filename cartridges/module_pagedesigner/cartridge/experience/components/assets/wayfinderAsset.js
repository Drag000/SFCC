'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');
var ImageTransformationHelper = require('~/cartridge/scripts/helpers/ImageTransformationHelper.js');

/**
 * Render logic for the assets.wayfinderAsset component.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var category = content.category;

    model.image = ImageTransformationHelper.getScaledImage(content.image);
    model.url = URLUtils.url('Search-Show', 'cgid', category.ID);
    model.title = content.title;

    return new Template('experience/components/assets/wayfinderAsset').render(model).text;
};