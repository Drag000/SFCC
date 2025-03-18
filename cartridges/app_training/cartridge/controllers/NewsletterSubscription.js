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


server.get('Show', server.middleware.https, csrfProtection.generateToken, function (req, res, next) {
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
server.post('Subscribe', server.middleware.https, csrfProtection.validateAjaxRequest, function (req, res, next) {
    var profileForm = server.forms.getForm('profile');
    var formErrors = require('*/cartridge/scripts/formErrors');
    
    var email = profileForm.customer.email.value;
    var firstName = profileForm.customer.firstname.value;
    var lastName = profileForm.customer.lastname.value;

    if (profileForm.valid) {
        Transaction.wrap(function () {
            var existingSubscription = CustomObjectMgr.getCustomObject('NewsletterSubscription', email);
            if (existingSubscription) {
                
                // res.json({
                //     success: false,
                //     // redirectUrl: URLUtils.url('Home-Show').toString(),
                //     error: {
                //         subscribeEmail: Resource.msg('error.message.already.subscribed', 'newsletter', null)
                //     }
                // });
                
                // profileForm.valid = false;
                profileForm.customer.email.valid = false;
                profileForm.customer.email.error = Resource.msg('error.message.already.subscribed', 'newsletter', null);
                
                res.json({
                    success: false,
                    fields: formErrors.getFormErrors(profileForm)
                });
                
                return false;
            }
            
            var coupon = CouponMgr.getCoupon('NewsletterSubscription');
            var couponCode = coupon.getNextCouponCode();
            
            var customObject = CustomObjectMgr.createCustomObject('NewsletterSubscription', email);
            customObject.custom.email = email;
            customObject.custom.couponCode = couponCode;

            newsletterEmailHelpers.sendNewsletterEmailNotification(email, firstName, lastName, couponCode);

            res.json({ 
            success: true,
            redirectUrl: URLUtils.url('Home-Show').toString(),
            });
            
        });
    } else {
        res.json({
            // success: false,
            fields: formErrors.getFormErrors(profileForm)
        });
    }
    
    return next();
});

module.exports = server.exports();

