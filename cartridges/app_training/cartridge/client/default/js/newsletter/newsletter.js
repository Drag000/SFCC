'use strict';

var formValidation = require('../../../../../../app_storefront_base/cartridge/client/default/js/components/formValidation');
var createErrorNotification = require('../../../../../../app_storefront_base/cartridge/client/default/js/components/errorNotification.js');

module.exports = {

    subscibe: function () {
        $('.submit-newsletter-confirmation-btn').click(function (e) {
            // Check if the alert message exists and remove it
            var alertMessage = $('#newsletterForm').find('.alert.alert-danger');
            if (alertMessage.length > 0) {
                alertMessage.remove();
            }
            
            // Submit the form
            $('#newsletterForm').submit();
        });
    
        $('form.subscription-form').submit(function (e) {           
            e.preventDefault();
            
            var form = $(this);
            var formData = form.serialize();
            var url = form.attr('action');
            
            $.spinner().start();
            $.ajax({
            url: url,
            type: 'post',
            data: formData,
            dataType: 'json',
            success: function (data) {
                $.spinner().stop();
                if (!data.success) {
                    formValidation(form, data);
                } else {
                    window.location.href = data.redirectUrl;
                }
            },
            error: function (data) {
                $.spinner().stop();
                createErrorNotification($('.error-messaging'), data.responseText.fields);
            }   
            });
        });                    
    },
    
    modal: function () {
        $('#subscribeNewsletterModal').on('shown.bs.modal', function () {
            $(this).attr('aria-hidden', 'false');
        });
        
        $('#subscribeNewsletterModal').on('hidden.bs.modal', function () {
            $(this).attr('aria-hidden', 'true');
        });
        },
};



 