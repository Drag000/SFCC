'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');
var ImageTransformationHelper = require('~/cartridge/scripts/helpers/ImageTransformationHelper.js');


/**
* Renders a wayfinder asset component using the provided context.
*
* @param {Object} context - The context object containing content data for the wayfinder asset.
* @param {Object} context.content - The content data for the wayfinder asset.
* @param {Object} [context.content.image] - An optional image associated with the wayfinder asset.
* @param {Object} [context.content.category] - An optional category object associated with the wayfinder asset.
* @param {string} [context.content.category.ID] - The ID of the category used to generate the URL.
* @param {string} [context.content.title] - An optional title for the wayfinder asset.
* @returns {string} The rendered HTML text of the wayfinder asset component.
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
    
    if (content.title) {
    model.title = content.title;
    }
    
    return new Template('experience/components/assets/wayfinderAsset').render(model).text;
};