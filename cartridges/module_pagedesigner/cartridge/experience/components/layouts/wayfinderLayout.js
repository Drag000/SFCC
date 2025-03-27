'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');


/**
* Renders the wayfinder layout component by preparing the model and invoking the template rendering.
*
* @param {Object} context - The context object containing information about the current rendering state.
* @param {Object} context.component - The component object representing the current layout component.
* @returns {string} The rendered HTML text of the wayfinder layout component.
*/
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/layouts/wayfinderLayout').render(model).text;
};
