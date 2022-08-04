const axios = require('axios');
require('dotenv').config();

const {
    GOOGLE_LOCATION_API_KEY
} = process.env;

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY


const newsSearch = async (lat, lng) => {

    const body = new URLSearchParams({
        key: GOOGLE_LOCATION_API_KEY,
        latlng: `${lat},${lng}`
    });

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${body.toString()}`);

    const address = response.data.results[0].formatted_address.split(', ');

    return {
        country: address[address.length - 1],
        city: address[address.length - 2]
    }
}


newsSearch(-42.5626063,171.0296444)
.then(data => console.log(data))
.catch(error => console.log(error));


module.exports = newsSearch;
