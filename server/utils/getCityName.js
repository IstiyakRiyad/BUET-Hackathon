const axios = require('axios');
require('dotenv').config();

const {
    GOOGLE_LOCATION_API_KEY,
    GOOGLE_API_URL
} = process.env;


const newsSearch = async (lat, lng) => {

    const body = new URLSearchParams({
        key: GOOGLE_LOCATION_API_KEY,
        latlng: `${lat},${lng}`
    });

    const response = await axios.get(`${GOOGLE_API_URL}/maps/api/geocode/json?${body.toString()}`);

    const address = response.data.results[0].formatted_address.split(', ');

    return {
        country: address[address.length - 1],
        city: address[address.length - 2]
    }
}


module.exports = newsSearch;
