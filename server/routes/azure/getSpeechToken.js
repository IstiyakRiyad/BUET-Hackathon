const router = require('express').Router();
const { default: axios } = require('axios');
const fetch = require('node-fetch');


const {
    AZURE_SPEECH_KEY,
    AZURE_SPEECH_REGION
} = process.env;




/**
 * @swagger
 * /azure/speechToken:
 *  get:
 *      description: Get Token for azure service
 *      tags:
 *      - Speech To Text
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *                 
 *      responses:
 *          200:
 *              description: Azure Authorization Token
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
 *                                      token:
 *                                          type: jwt
 *                                      region:
 *                                          type: string
 *                      examples:
 *                          example:
 *                              value: { "token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiI1NGRjMjQ4MWFlNDI0MGI3ODkyMzJiMTM2YmZhMjg1MCIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy9kOGYyMjIwZS01MjYwLTRlZWQtODgwMy04ZWFkYjI5NWE2YjgvcmVzb3VyY2VHcm91cHMvZ3JvdXBfY29nbml0aXZlX3NlcnZpY2UvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy9zcGVlY2hTZXJ2aWNlQ29nbml0aXZlIiwic2NvcGUiOiJzcGVlY2hzZXJ2aWNlcyIsImF1ZCI6InVybjptcy5zcGVlY2hzZXJ2aWNlcy5lYXN0dXMiLCJleHAiOjE2NTk2MTEwOTYsImlzcyI6InVybjptcy5jb2duaXRpdmVzZXJ2aWNlcyJ9.AOEkXEj6wl4OaERazeOLdEqUafQKVKfzujwdTmsdnEU", "region": "eastus"}
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
        const response = await axios.post(
            `https://${AZURE_SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
            null,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.json({
            message: 'Azure authorization token',
            data: {
                token: response.data,
                region: AZURE_SPEECH_REGION
            }
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;