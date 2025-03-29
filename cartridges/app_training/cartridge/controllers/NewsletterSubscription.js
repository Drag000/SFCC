'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var CouponMgr = require('dw/campaign/CouponMgr');
var newsletterEmailHelpers = require('*/cartridge/scripts/helpers/newsletterEmailHelpers');


/**
* Handles the 'Show' route for displaying the newsletter subscription page.
*
* This function retrieves the target URL from the query string, constructs the
* subscription URL, and prepares the newsletter subscription form for rendering.
* It then renders the 'newsletterSubscription' template with the necessary data.
*
* @param {Object} req - The server request object containing the query string parameters.
* @param {Object} res - The server response object used to render the page.
* @param {Function} next - The callback function to pass control to the next middleware.
*/
server.get('Show', function (req, res, next) {
    var target = req.querystring.rurl || 1;
    var subscribeNewsletterUrl = URLUtils.url('NewsletterSubscription-Subscribe', 'rurl', target).relative().toString();
    
    var profileForm = server.forms.getForm('newsletterSubscription');
    profileForm.clear();
    
    res.render('newsletterSubscription', {
        subscribeNewsletterUrl: subscribeNewsletterUrl,
        profileForm: profileForm
    });
    next();
});


/**
* Handles the subscription process for the newsletter by creating a custom object for the subscriber
* and optionally assigning a coupon code. If the email is already subscribed, an error message is displayed.
* 
* @function
* @param {Object} req - The server request object containing form data for subscription.
* @param {Object} res - The server response object used to render views or redirect.
* @param {Function} next - The callback function to pass control to the next middleware.
* 
* @throws Will render an error message if there is an issue with the subscription process.
* 
* @description This function processes a POST request to subscribe a user to the newsletter. It checks if the 
* email is already subscribed, and if not, creates a new subscription entry in the custom object manager. 
* A coupon code is generated and assigned if available. A notification email is sent to the subscriber. 
* The user is redirected to the home page upon successful subscription.
*/
server.post('Subscribe', function (req, res, next) {
    var email = req.form.subscribeFormEmail;
    var firstName = req.form.subscribeFormFirstname;
    var lastName = req.form.subscribeFormLastname;

    try {
        var existingSubscription = CustomObjectMgr.getCustomObject('NewsletterSubscription', email);
        if (existingSubscription) {
            res.render('newsletterSubscription', {
                error: Resource.msg('error.message.already.subscribed', 'newsletter', null)
            });
            return next();
        }
        
        var couponCode;
        Transaction.wrap(function () {
            var coupon = CouponMgr.getCoupon('NewsletterSubscription');
            if (coupon) {
                couponCode = coupon.getNextCouponCode();
            }

            var customObject = CustomObjectMgr.createCustomObject('NewsletterSubscription', email);
            customObject.custom.email = email;
            if (couponCode) {
                customObject.custom.couponCode = couponCode;
            }
        });

        newsletterEmailHelpers.sendNewsletterEmailNotification(email, firstName, lastName, couponCode);
        res.redirect(URLUtils.url('Home-Show').toString());

    } catch (e) {
        res.render('newsletterSubscription', {
            error: Resource.msg('subscribe.email.error', 'newsletter', null)
        });
    }

    return next();
});

module.exports = server.exports();

