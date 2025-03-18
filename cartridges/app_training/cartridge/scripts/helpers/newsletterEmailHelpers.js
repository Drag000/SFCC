'use strict';

/**
* Retrieves the sender email address from the site's custom preferences.
* 
* @returns {string} The sender email address configured in the site's preferences.
*/
function getSenderEmail() {
    var Site = require('dw/system/Site');

    var site = Site.getCurrent();
    var senderEmail = site.getPreferences().custom.senderEmail;

    return senderEmail;
}

/**
* Sends a newsletter email notification to a specified recipient, optionally including a coupon code.
*
* @param {string} email - The recipient's email address.
* @param {string} firstName - The recipient's first name.
* @param {string} lastName - The recipient's last name.
* @param {string} [couponCode] - An optional coupon code to include in the email.
*/
function sendNewsletterEmailNotification(email, firstName, lastName, couponCode) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Resource = require('dw/web/Resource');
    var senderEmail = getSenderEmail()

    var emailObj = {
        to: email,
        subject: Resource.msg('subscribe.email.subject', 'newsletter', null),
        from: senderEmail,
    };

    var context = {
        firstName: firstName,
        lastName: lastName,
    }
    
    const template = couponCode ? 'newsletterEmailCouponCode' : 'newsletterEmailNoCouponCode';
    if (couponCode) {
        context.couponCode = couponCode;
    }

    emailHelpers.sendEmail(emailObj, template, context);
}


module.exports = {
    sendNewsletterEmailNotification: sendNewsletterEmailNotification,
    getSenderEmail: getSenderEmail,
};

