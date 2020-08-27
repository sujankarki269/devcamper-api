const dotenv = require('dotenv');
const NodeGeocoder = require('node-geocoder');

dotenv.config({ path: './config/.env' });

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;