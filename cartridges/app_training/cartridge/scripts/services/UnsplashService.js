var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var unsplashService = LocalServiceRegistry.createService('app_unsplash.http.unsplash.get', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Authorization', 'Client-ID e5Wz1jUAFadHKpRQlv1TfdHk7nM8wIg6nsUp2xTZdWQ');
        var page = 1;
        var url = svc.getURL() + '?page=' + encodeURIComponent(page);

        svc.setURL(url);
        return null;
        
    },
    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },
    mockCall: function (svc, params) {
        var mockResponse = {
            "result": []
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

module.exports = unsplashService;