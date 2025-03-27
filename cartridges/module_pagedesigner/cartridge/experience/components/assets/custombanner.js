'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');
var ImageTransformationHelper = require('~/cartridge/scripts/helpers/ImageTransformationHelper.js');

/**
 * Render logic for the assets.custombanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var category = content.category;

    if (content.image) {
    model.image = ImageTransformationHelper.getScaledImage(content.image);
    }
    
    if (category) {
        model.url = URLUtils.url('Search-Show', 'cgid', category.ID);
    } else {
        model.url = URLUtils.url('Home-Show');
    }

    return new Template('experience/components/assets/custombanner').render(model).text;
};