const axios = require('axios');

// The NeoWs API key is passed as an environment variable
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1'

/**
 * Calls a GET request to the NeoWs API and returns a list of NEOs.
 *
 * @param {String} endpoint - Endpoint to call over the base URL.
 * @param {Object} params - Parameters of the get request.
 *
 * @return {Array} - List of NEOs 
 */
async function getFromNeoWs(endpoint, params) {

    if(!API_KEY) {
        throw new Error("No NeoWs API Key provided")
    }

    try {
        const neoWsResponse = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params
            }
        })
        const listOfNeos = neoWsResponse.data.near_earth_objects
        return listOfNeos
    }
    catch(error) {
        throw new Error(error.message)
    }
}

module.exports = getFromNeoWs