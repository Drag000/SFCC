'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var CouponMgr = require('dw/campaign/CouponMgr');
var newsletterEmailHelpers = require('*/cartridge/scripts/helpers/newsletterEmailHelpers');
var Site = require('dw/system/Site');

/**
* Renders the newsletter subscription form page with a URL for subscribing.
* 
* This function handles the 'Form' route for the newsletter subscription, ensuring
* that the request is made over HTTPS. It constructs a URL for the subscription
* action and renders the 'newsletterSubscription' template with initial form values.
* 
* @param {Object} req - The server request object, containing query parameters and other request data.
* @param {Object} res - The server response object, used to render the template and send the response.
* @param {Function} next - The next middleware function in the stack, called to pass control to the next handler.
* 
* @property {string} req.querystring.rurl - The return URL parameter from the query string, defaulting to '1' if not provided.
* 
* @returns {void} - This function does not return a value. It renders a template and calls the next middleware.
*/
server.get('Show', server.middleware.https, function (req, res, next) {
    var target = req.querystring.rurl || 1;
    var subscribeNewsletterUrl = URLUtils.url('NewsletterSubscription-Subscribe', 'rurl', target).relative().toString();

    res.render('newsletterSubscription', {
        subscribeNewsletterUrl: subscribeNewsletterUrl,
        email: '',
        firstName: '',
        lastName: ''
    });
    next();
});


/**
* Handles the subscription to a newsletter by processing the user's email and name, 
* checking for existing subscriptions, and assigning a coupon code if available.
* 
* @function
* @param {Object} req - The server request object containing form data.
* @param {Object} res - The server response object used to render views or redirect.
* @param {Function} next - The next middleware function in the stack.
* 
* @returns {void}
* 
* @throws Will render an error message if there is an issue with the subscription process.
* 
* @description This function is triggered by a POST request to the 'Subscribe' endpoint. 
* It retrieves the user's email, first name, and last name from the request form. 
* It checks if the email is already subscribed by querying the 'NewsletterSubscription' custom object. 
* If the email is already subscribed, it renders an error message. 
* If not, it attempts to retrieve a coupon code from the 'NewsletterSubscription' coupon manager. 
* If a coupon code is available, it creates a new custom object for the subscription, 
* assigns the email and coupon code to it, and sends a notification email with the coupon code. 
* If no coupon code is available, it sends a notification email without a coupon code. 
* In both cases, it redirects the user to the home page. 
* If an error occurs during the process, it catches the exception and renders an error message.
*/
server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var email = req.form.subscribeEmail;
    var firstName = req.form.subscribeFormFirstname;
    var lastName = req.form.subscribeLastname;

    try {
        Transaction.wrap(function () {
            var existingSubscription = CustomObjectMgr.getCustomObject('NewsletterSubscription', email);
            if (existingSubscription) {
                res.render('newsletterSubscription', {
                    error: Resource.msg('error.message.already.subscribed', 'newsletter', null)
                });
                return next();
            }

            var coupon = CouponMgr.getCoupon('NewsletterSubscription');
            var couponCode = coupon.getNextCouponCode();

            if (!couponCode) {

                newsletterEmailHelpers.sendNewsletterEmailNotification(email, firstName, lastName);
                res.redirect(URLUtils.url('Home-Show').toString());

                return next();
            };

            var customObject = CustomObjectMgr.createCustomObject('NewsletterSubscription', email);
            customObject.custom.email = email;
            customObject.custom.couponCode = couponCode;

            newsletterEmailHelpers.sendNewsletterEmailNotification(email, firstName, lastName, couponCode);
            res.redirect(URLUtils.url('Home-Show').toString());
        });

    } catch (e) {
        res.render('newsletterSubscription', {
            error: Resource.msg('subscribe.email.error', 'newsletter', null)
        });
        return next();
    }

    next();
});

module.exports = server.exports();

