const router = require('express').Router();
const axios = require('axios');
const checkAuth = require('../authorization/checkAuth');


const {
    GOOGLE_SEARCH_URL,
    GOOGLE_SEARCH_TOKEN
} = process.env;


/**
 * @swagger
 * tags:
 *     name: Web Search
 *     description: Web Search API
 */




/**
 * @swagger
 * /search:
 *  get:
 *      description: Nearby News
 *      tags:
 *      - Web Search
 * 
 *      parameters:
 *      -   name: search
 *          in: query
 *          description: Search text
 *          schema:
 *              type: string
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: Web Search Result
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                              data:
 *                                  type: object
 *                      examples:
 *                          example:
 *                              value: {"message": "Search data","data": [{"position": 1,"title": "undefined - JavaScript - MDN Web Docs - Mozilla","link": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined","date": "8 days ago"},]}
 *          401:
 *              description: Authorization code required
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Authorization code required'}
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                      examples:
 *                          example:
 *                              value: {message: 'Server Error'}
 * 
 */







router.get('/', checkAuth(), async (req, res, next) => {
    try {
        const {search} = req.query;

        const query = new URLSearchParams({
            q: search,
            hl: "en",
            google_domain: "google.com",
            api_key: GOOGLE_SEARCH_TOKEN
        });

        const response = await axios.get(`${GOOGLE_SEARCH_URL}?${query}`);

        const data = response.data.organic_results.map(({position, title, link, date}) => ({position, title, link, date}));

        res.json({
            message: 'Search data',
            data
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;