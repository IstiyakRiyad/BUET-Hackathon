const axios = require('axios');
require('dotenv').config();

const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_ACCOUNT_URL,
    SPOTIFY_REFRESH_TOKEN
} = process.env;

const spotifyAccessToken = async () => {
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
    });

    const response = await axios.post(
        `${SPOTIFY_ACCOUNT_URL}/api/token`,
        body,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        }
    )

    return response.data;
}

spotifyAccessToken()
.then(data => console.log(data))
.catch(error => console.log(error));

module.exports = spotifyAccessToken;
