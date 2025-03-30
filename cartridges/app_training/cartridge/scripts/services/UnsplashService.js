var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');


/**
* Creates a service for interacting with the Unsplash API to retrieve image data.
* This service is configured to perform HTTP GET requests to the Unsplash API
* using a specific client ID for authorization.
*
* @param {Object} svc - The service instance used to configure the request.
* @param {Object} params - Parameters for the request.
* @param {string} params.page - The page number for pagination of results.
* @param {string} params.endpoint - The specific API endpoint to be accessed.
*
* @returns {Object} The response from the Unsplash API, parsed as a JSON object.
* If the response cannot be parsed, returns null.
*
* @example
* var response = unsplashService.call({ page: 1, endpoint: '/photos' });
* if (response.ok) {
*     var photos = response.object;
*     // Process photos
* }
*
* @property {Function} createRequest - Configures the HTTP request, setting the method to GET
* and adding necessary headers including the authorization header.
* @property {Function} parseResponse - Parses the JSON response from the Unsplash API.
* Logs an error if parsing fails and returns null.
* @property {Function} mockCall - Provides a mock response for testing purposes,
* simulating a successful API call with a predefined response.
* @property {Function} filterLogMessage - Filters log messages, currently returns the message as is.
*/
var unsplashService = LocalServiceRegistry.createService('app_unsplash.http.unsplash.get', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Authorization', 'Client-ID e5Wz1jUAFadHKpRQlv1TfdHk7nM8wIg6nsUp2xTZdWQ');
        
        var queryParams = [
            'page=' + encodeURIComponent(params.page),
        ];
        
        var url = svc.getURL() + params.endpoint + '?' + queryParams.join('&');
        svc.setURL(url);
        
        return null; // No request body for GET
    },
    parseResponse: function (svc, client) {
        try {
            return JSON.parse(client.text);
        } catch (e) {
            Logger.error('Failed to parse response: {0}', e.message);
            return null;
        }
    },
    mockCall: function (svc, params) {
        var mockResponse = [
            {
              "id": "3p9zaNwUtv8",
              "slug": "a-man-standing-on-top-of-a-mountain-next-to-a-lake-3p9zaNwUtv8",
              "alternative_slugs": {
                "en": "a-man-standing-on-top-of-a-mountain-next-to-a-lake-3p9zaNwUtv8",
                "es": "un-hombre-de-pie-en-la-cima-de-una-montana-junto-a-un-lago-3p9zaNwUtv8",
                "ja": "湖のほとりの山の頂上に立つ男-3p9zaNwUtv8",
                "fr": "un-homme-debout-au-sommet-dune-montagne-a-cote-dun-lac-3p9zaNwUtv8",
                "it": "un-uomo-in-piedi-sulla-cima-di-una-montagna-vicino-a-un-lago-3p9zaNwUtv8",
                "ko": "호수-옆-산-정상에-서-있는-남자-3p9zaNwUtv8",
                "de": "ein-mann-steht-auf-dem-gipfel-eines-berges-neben-einem-see-3p9zaNwUtv8",
                "pt": "um-homem-em-pe-no-topo-de-uma-montanha-ao-lado-de-um-lago-3p9zaNwUtv8"
              },
              "created_at": "2025-02-25T03:07:45Z",
              "updated_at": "2025-03-30T11:01:42Z",
              "promoted_at": "2025-03-05T00:14:00Z",
              "width": 4480,
              "height": 6720,
              "color": "#262626",
              "blur_hash": "L%DwdOIpjFjYp{n$axjZFzxZkCWX",
              "description": null,
              "alt_description": "A man standing on top of a mountain next to a lake",
              "breadcrumbs": [],
              "urls": {
                "raw": "https://images.unsplash.com/photo-1740452527478-f88a376fd591?ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8&ixlib=rb-4.0.3",
                "full": "https://images.unsplash.com/photo-1740452527478-f88a376fd591?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8&ixlib=rb-4.0.3&q=85",
                "regular": "https://images.unsplash.com/photo-1740452527478-f88a376fd591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8&ixlib=rb-4.0.3&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1740452527478-f88a376fd591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8&ixlib=rb-4.0.3&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1740452527478-f88a376fd591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8&ixlib=rb-4.0.3&q=80&w=200",
                "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1740452527478-f88a376fd591"
              },
              "links": {
                "self": "https://api.unsplash.com/photos/a-man-standing-on-top-of-a-mountain-next-to-a-lake-3p9zaNwUtv8",
                "html": "https://unsplash.com/photos/a-man-standing-on-top-of-a-mountain-next-to-a-lake-3p9zaNwUtv8",
                "download": "https://unsplash.com/photos/3p9zaNwUtv8/download?ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8",
                "download_location": "https://api.unsplash.com/photos/3p9zaNwUtv8/download?ixid=M3w3MjU1ODZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDMzNTI0ODV8"
              },
              "likes": 74,
              "liked_by_user": false,
              "current_user_collections": [],
              "sponsorship": null,
              "topic_submissions": {
                "travel": {
                  "status": "approved",
                  "approved_on": "2025-03-05T08:22:52Z"
                }
              },
              "asset_type": "photo",
              "user": {
                "id": "7i_qeLiLFUI",
                "updated_at": "2025-03-12T01:19:09Z",
                "username": "hollymandarich",
                "name": "Holly Mandarich",
                "first_name": "Holly",
                "last_name": "Mandarich",
                "twitter_username": null,
                "portfolio_url": "http://www.hollymandarich.com",
                "bio": "Commercial Photographer\r\n Like my work? Pay From the Heart: venmo.com/hollymandarich or click the PayPal link below :)",
                "location": "Based in Colorado / Vanlife",
                "links": {
                  "self": "https://api.unsplash.com/users/hollymandarich",
                  "html": "https://unsplash.com/@hollymandarich",
                  "photos": "https://api.unsplash.com/users/hollymandarich/photos",
                  "likes": "https://api.unsplash.com/users/hollymandarich/likes",
                  "portfolio": "https://api.unsplash.com/users/hollymandarich/portfolio"
                },
                "profile_image": {
                  "small": "https://images.unsplash.com/profile-1740447823230-040b93adae47image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
                  "medium": "https://images.unsplash.com/profile-1740447823230-040b93adae47image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
                  "large": "https://images.unsplash.com/profile-1740447823230-040b93adae47image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                },
                "instagram_username": "holly.mandarich",
                "total_collections": 0,
                "total_likes": 468,
                "total_photos": 205,
                "total_promoted_photos": 42,
                "total_illustrations": 0,
                "total_promoted_illustrations": 0,
                "accepted_tos": true,
                "for_hire": true,
                "social": {
                  "instagram_username": "holly.mandarich",
                  "portfolio_url": "http://www.hollymandarich.com",
                  "twitter_username": null,
                  "paypal_email": null
                }
              },
              "exif": {
                "make": "Canon",
                "model": " EOS 5D Mark IV",
                "name": "Canon, EOS 5D Mark IV",
                "exposure_time": "1/1000",
                "aperture": "6.3",
                "focal_length": "24.0",
                "iso": 320
              },
              "location": {
                "name": "Oregon, USA",
                "city": null,
                "country": "United States",
                "position": {
                  "latitude": 43.804133,
                  "longitude": -120.554201
                }
              },
              "views": 625547,
              "downloads": 3517
            }
          ]
        ;
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