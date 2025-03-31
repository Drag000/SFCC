'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');
var ImageTransformationHelper = require('~/cartridge/scripts/helpers/ImageTransformationHelper.js');


/**
* Renders a custom banner component for the storefront.
*
* This function generates a model for the custom banner component using the provided context.
* It processes the content to include an image and a URL based on the category information.
* The final output is rendered using a specific template.
*
* @param {Object} context - The context object containing content and other relevant data.
* @param {Object} context.content - The content object containing details for rendering the banner.
* @param {dw.catalog.Category} [context.content.category] - The category associated with the banner, if any.
* @param {dw.content.MediaFile} [context.content.image] - The image to be displayed in the banner, if provided.
* @returns {string} The rendered HTML text of the custom banner component.
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