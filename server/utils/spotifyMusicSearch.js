const axios = require('axios');
const spotifyAccessToken = require('./spotifyAccessToken');
require('dotenv').config();

const {
    SPOTIFY_API_URL
} = process.env;

const spotifyMusicSearch = async (query, limit) => {

    const token = await spotifyAccessToken();

    const body = new URLSearchParams({
        q: query,
        type: 'track',
        offset: 0,
        limit: limit
    });

    console.log(body.toString())
    const response = await axios.get(
        `${SPOTIFY_API_URL}/v1/search?${body.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            }
        }
    );
    const data = response.data.tracks.items.map(({name, preview_url, href, duration_ms}) => ({name, preview_url, href}));

    return data;
}


module.exports = spotifyMusicSearch;
