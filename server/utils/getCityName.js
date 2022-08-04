const axios = require('axios');
require('dotenv').config();

const {
    GOOGLE_LOCATION_API_KEY,
    GOOGLE_API_URL
} = process.env;

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY


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


newsSearch(21.3222553, -157.9421873)
.then(data => console.log(data))
.catch(error => console.log(error));


module.exports = newsSearch;
