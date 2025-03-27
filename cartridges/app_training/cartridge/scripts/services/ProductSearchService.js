var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var productSearchService = LocalServiceRegistry.createService('app_ocapi.http.productsearch', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Content-Type', 'application/json');

        var queryParams = [
            'q=Sony',
            'refine=cgid%3Delectronics',
            'count=20',
            'client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];
        var url = svc.getURL() + '?' + queryParams.join('&');
        svc.setURL(url);
        return null; // No request body for GET
    },
    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },
    mockCall: function (svc, params) {
        var mockResponse = {
            hits: [
                // Mock product data
            ]
        };
        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: JSON.stringify(mockResponse)
        };
    },
    filterLogMessage: function (msg) {
        return msg;
    }
});

module.exports = productSearchService;