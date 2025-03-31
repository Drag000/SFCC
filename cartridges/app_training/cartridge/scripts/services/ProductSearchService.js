var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');

/**
* Service configuration for the product search functionality using OCAPI.
* This service is responsible for creating and sending a GET request to the product search endpoint,
* parsing the response, and providing a mock response for testing purposes.
* 
* @type {Object}
* @property {Function} createRequest - Configures the service request with method, headers, and URL.
* @property {Function} parseResponse - Parses the JSON response from the service.
* @property {Function} mockCall - Provides a mock response for testing the service without actual API calls.
* @property {Function} filterLogMessage - Filters log messages for this service.
* 
* @example
* var params = {
*     query: 'Sony',
*     refine: 'cgid=electronics',
*     count: 1,
*     clientId: 'your-client-id',
*     endpoint: '/product_search'
* };
* var response = productSearchService.call(params);
* 
* @returns {Object} The service response object containing the product search results.
*/
var productSearchService = LocalServiceRegistry.createService('app_ocapi.http.productsearch', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Content-Type', 'application/json');
        
        var queryParams = [
            'q=' + encodeURIComponent(params.query),
            'refine=' + encodeURIComponent(params.refine),
            'count=' + (params.count),
            'client_id=' + (params.clientId)
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
        var mockResponse = {
            "_v": "24.5",
            "_type": "product_search_result",
            "count": 1,
            "hits": [
              {
                "_type": "product_search_hit",
                "hit_type": "product",
                "link": "https://zzrb-136.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v24_5/products/sony-kdl-42v4100M?count=1&q=Sony&refine=cgid%3Delectronics&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "product_id": "sony-kdl-42v4100M",
                "product_name": "Sony Bravia® V-Series 42\" LCD High Definition Television",
                "product_type": {
                  "_type": "product_type",
                  "item": true,
                  "option": true
                },
                "represented_product": {
                  "_type": "product_ref",
                  "id": "sony-kdl-42v4100M",
                  "link": "https://zzrb-136.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v24_5/products/sony-kdl-42v4100M?count=1&q=Sony&refine=cgid%3Delectronics&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                }
              }
            ],
            "next": "https://zzrb-136.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v24_5/product_search?count=1&start=1&q=Sony&refine=cgid%3Delectronics&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "query": "Sony",
            "refinements": [
              {
                "_type": "product_search_refinement",
                "attribute_id": "cgid",
                "label": "Category",
                "values": [
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 2,
                    "label": "New Arrivals",
                    "value": "newarrivals"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 27,
                    "label": "Electronics",
                    "value": "electronics",
                    "values": [
                      {
                        "_type": "product_search_refinement_value",
                        "hit_count": 10,
                        "label": "Televisions",
                        "value": "electronics-televisions"
                      },
                      {
                        "_type": "product_search_refinement_value",
                        "hit_count": 5,
                        "label": "Digital Cameras",
                        "value": "electronics-digital-cameras"
                      },
                      {
                        "_type": "product_search_refinement_value",
                        "hit_count": 2,
                        "label": "iPod & MP3 Players",
                        "value": "electronics-digital-media-players"
                      },
                      {
                        "_type": "product_search_refinement_value",
                        "hit_count": 10,
                        "label": "Gaming",
                        "value": "electronics-gaming"
                      }
                    ]
                  }
                ]
              },
              {
                "_type": "product_search_refinement",
                "attribute_id": "price",
                "label": "Price",
                "values": [
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 3,
                    "label": "$20 - $49.99",
                    "value": "(20..50)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 4,
                    "label": "$50 - $99.99",
                    "value": "(50..100)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 10,
                    "label": "$100 - $499.99",
                    "value": "(100..500)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 2,
                    "label": "$500 - $999.99",
                    "value": "(500..1000)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 4,
                    "label": "$1,000 - $1,499.99",
                    "value": "(1000..1500)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "$2,000 - $2,499.99",
                    "value": "(2000..2500)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "$2,500 - $4,999.99",
                    "value": "(2500..5000)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "$5,000  - $9,999.99",
                    "value": "(5000..10000)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "$10,000 - $14,999.99",
                    "value": "(10000..15000)"
                  }
                ]
              },
              {
                "_type": "product_search_refinement",
                "attribute_id": "c_isNew",
                "label": "New Arrival"
              },
              {
                "_type": "product_search_refinement",
                "attribute_id": "brand",
                "label": "Brand",
                "values": [
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "Atari",
                    "value": "Atari"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 2,
                    "label": "EASports",
                    "value": "EASports"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "LucasArts",
                    "value": "LucasArts"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "Namco",
                    "value": "Namco"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 21,
                    "label": "Sony",
                    "value": "Sony"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "Ubi Soft",
                    "value": "Ubi Soft"
                  }
                ]
              },
              {
                "_type": "product_search_refinement",
                "attribute_id": "c_batteryType",
                "label": "Type",
                "values": [
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 1,
                    "label": "Alkaline (AA)",
                    "value": "Alkaline (AA)"
                  },
                  {
                    "_type": "product_search_refinement_value",
                    "hit_count": 6,
                    "label": "Lithium Ion",
                    "value": "Lithium Ion"
                  }
                ]
              }
            ],
            "search_phrase_suggestions": {
              "_type": "suggestion",
              "suggested_phrases": [
                {
                  "_type": "suggested_phrase",
                  "exact_match": true,
                  "phrase": "Sony"
                }
              ],
              "suggested_terms": [
                {
                  "_type": "suggested_terms",
                  "original_term": "sony",
                  "terms": [
                    {
                      "_type": "suggested_term",
                      "completed": false,
                      "corrected": false,
                      "exact_match": true,
                      "value": "Sony"
                    }
                  ]
                }
              ]
            },
            "selected_refinements": {
              "cgid": "electronics"
            },
            "sorting_options": [
              {
                "_type": "product_search_sorting_option",
                "id": "best-matches",
                "label": "Best Matches"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "price-low-to-high",
                "label": "Price Low To High"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "price-high-to-low",
                "label": "Price High to Low"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "product-name-ascending",
                "label": "Product Name A - Z"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "product-name-descending",
                "label": "Product Name Z - A"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "brand",
                "label": "Brand"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "most-popular",
                "label": "Most Popular"
              },
              {
                "_type": "product_search_sorting_option",
                "id": "top-sellers",
                "label": "Top Sellers"
              }
            ],
            "start": 0,
            "total": 27
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