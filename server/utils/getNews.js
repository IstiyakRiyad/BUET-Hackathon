const axios = require('axios');
require('dotenv').config();

const {
    NEWS_API_KEY,
    NEWS_API_URL
} = process.env;

const newsSearch = async (query, pageSize, language) => {

    const body = new URLSearchParams({
        apiKey: NEWS_API_KEY,
        q: query,
        sortBy: 'relevancy',
        // language: language ? language : 'en',
        pageSize
    });

    const response = await axios.get(`${NEWS_API_URL}/v2/everything?${body.toString()}`);

    return response.data.articles;
}



module.exports = newsSearch;
