'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var CouponMgr = require('dw/campaign/CouponMgr');
var newsletterEmailHelpers = require('*/cartridge/scripts/helpers/newsletterEmailHelpers');
var Site = require('dw/system/Site');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

/**
* Handles the 'Show' route for displaying the newsletter subscription page.
*
* This function retrieves the target URL from the request query string or defaults to 1 if not provided.
* It constructs the URL for the newsletter subscription using the 'NewsletterSubscription-Subscribe' endpoint
* and the target URL. It then clears the profile form and renders the 'newsletterSubscription' template with
* the subscription URL and the cleared profile form.
*
* @param {Object} req - The server request object containing the query string parameters.
* @param {Object} res - The server response object used to render the template.
* @param {Function} next - The callback function to pass control to the next middleware.
*/
server.get('Show', function (req, res, next) {
    var target = req.querystring.rurl || 1;
    var subscribeNewsletterUrl = URLUtils.url('NewsletterSubscription-Subscribe', 'rurl', target).relative().toString();

    var profileForm = server.forms.getForm('profile');
    profileForm.clear();

    res.render('newsletterSubscription', {
        subscribeNewsletterUrl: subscribeNewsletterUrl,
        profileForm: profileForm
    });
    next();
});

/**
* Handles the subscription to the newsletter via a POST request. This function processes the form data,
* checks for existing subscriptions, and creates a new subscription if valid. It also sends a notification
* email and returns a JSON response indicating the success or failure of the operation.
*
* @param {Object} req - The server request object containing form data and other request information.
* @param {Object} res - The server response object used to send back the desired HTTP response.
* @param {Function} next - The callback function to pass control to the next middleware.
* @returns {void} - Returns a JSON response with the subscription status and any errors if applicable.
*/
server.post('Subscribe', function (req, res, next) {
    var profileForm = server.forms.getForm('profile');
    var formErrors = require('*/cartridge/scripts/formErrors');

    var email = profileForm.customer.email.value;
    var firstName = profileForm.customer.firstname.value;
    var lastName = profileForm.customer.lastname.value;

    //Check if the email is already subscribed
    var existingSubscription = CustomObjectMgr.getCustomObject('NewsletterSubscription', email);
    if (existingSubscription) {
        res.json({
            success: false,
            error: [Resource.msg('error.message.already.subscribed', 'newsletter', null)]
        });
        return next();
    }

    if (profileForm.valid) {
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

        res.json({
            success: true,
            redirectUrl: URLUtils.url('Home-Show').toString(),
        });

    } else {
        res.json({
            fields: formErrors.getFormErrors(profileForm)
        });
    }

    return next();
});

module.exports = server.exports();

