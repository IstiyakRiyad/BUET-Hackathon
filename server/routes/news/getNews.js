const router = require('express').Router();
const getCityName = require('../../utils/getCityName');
const getNews = require('../../utils/getNews');




/**
 * @swagger
 * /news/search:
 *  get:
 *      description: Get Search Music
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
 *              description: Spotify Music Tracks
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
 *                                      tracks:
 *                                          type: array
 *                                          items:
 *                                              name: string
 *                                              href: string
 *                                              preview_url: string
 *                      examples:
 *                          example:
 *                              value: {"message": "Spotify Music Tracks","data": {"tracks": [{"name": "Mera Mann Kehne Laga","preview_url": "https://p.scdn.co/mp3-preview/e9a4c2f7e3a5cee6984554421ded09e40992cdb2?cid=dc42e416670c40f29d92ba5af3856e70","href": "https://api.spotify.com/v1/tracks/1ai3itvPFcWilE9NX0JTCf"},{"name": "Mera Mann Kehne Laga","preview_url": "https://p.scdn.co/mp3-preview/e9a4c2f7e3a5cee6984554421ded09e40992cdb2?cid=dc42e416670c40f29d92ba5af3856e70","href": "https://api.spotify.com/v1/tracks/1niVgR76UPobOED5cXfADq"}]}}
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
        
        const finalQuery = `${query ? query : ''} ${address.city ? address.city: ''} ${address.country ? address.country : ''}`;
        console.log(finalQuery);
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