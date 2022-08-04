const axios = require('axios');
const spotifyAccessToken = require('./spotifyAccessToken');


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

    const response = await axios.get(
        `${SPOTIFY_API_URL}/v1/search?${body.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            }
        }
    );
    const data = response.data.tracks.items.map(({name, preview_url, external_urls, duration_ms, album}) => ({name, preview_url, href: external_urls.spotify, duration_ms, image: album.images && album.images[0]}));

    return data;
}


module.exports = spotifyMusicSearch;
