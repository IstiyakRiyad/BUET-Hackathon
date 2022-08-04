const router = require('express').Router();
const { default: axios } = require('axios');
const fetch = require('node-fetch');


const {
    AZURE_SPEECH_KEY,
    AZURE_SPEECH_REGION
} = process.env;


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
            token: response.data,
            region: AZURE_SPEECH_REGION
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;