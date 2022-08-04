const router = require('express').Router();
const getCityName = require('../../utils/getCityName');
const getNews = require('../../utils/getNews');




/**
 * @swagger
 * /news/search:
 *  get:
 *      description: Nearby News
 *      tags:
 *      - News
 * 
 *      parameters:
 *      -   name: latitude
 *          in: query
 *          required: true
 *          description: Latitude
 *          schema:
 *              type: string
 *      -   name: longitude
 *          in: query
 *          required: true
 *          description: Longitude
 *          schema:
 *              type: string
 *      -   name: query
 *          in: query
 *          description: Search text
 *          schema:
 *              type: string
 *      -   name: limit
 *          in: query
 *          description: Number of News
 *          schema:
 *              type: number
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: Get Nearby News
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      news:
 *                                          type: array
 *                      examples:
 *                          example:
 *                              value: {"message": "News Data",  "data": {    "news": [      {        "source": {          "id": null,          "name": "Boing Boing"        },        "author": "Andrew Yi",        "title": "David M. Bird breaths life into his Becorns",        "description": "Since 2008, David M. Bird has been crafting and refining his photography series \"Becorns\", which zooms into the small world of acorn people interacting with nature.\n\n\n\n\n \r\nView this post on Instagram\r\nA post shared by Becorns (@davidmbird)\r\n\n\r\n\n\n\n\nInterleaved…",        "url": "https://boingboing.net/2022/07/31/david-m-bird-breaths-life-into-his-becorns.html",        "urlToImage": "https://i0.wp.com/boingboing.net/wp-content/uploads/2022/07/David-M.-Bird-Hummingbird.jpg?fit=1200%2C720&ssl=1",        "publishedAt": "2022-07-31T14:15:58Z",        "content": "Since 2008, David M. Bird has been crafting and refining his photography series \"Becorns\", which zooms into the small world of acorn people interacting with nature.\r\nInterleaved with David M. Bird's … [+2441 chars]"      }    ]  }}
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



router.get('/', async (req, res, next) => {
    try {
        let {query, limit, latitude, longitude} = req.query;

        if(!limit || limit < 1 ) limit = 10;

        const address = await getCityName(latitude, longitude);
        
        const finalQuery = `${query ? query : ''} ${address.country ? address.country : ''}`;

        const news = await getNews(finalQuery, limit);

        res.json({
            message: 'News Data',
            data: {
                news
            }
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;