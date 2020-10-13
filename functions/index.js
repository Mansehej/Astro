const functions = require('firebase-functions');
const axios = require('axios');

// The NeoWs API key is passed as an environment variable
const API_KEY = process.env.API_KEY;

// Used HTTP Callable functions instead of HTTP requests
// This is because all middleware (CORS), serialization, deserialization will be automatically handled
// And the only app that is going to call these functions is our firebase app.

const BASE_URL = 'https://api.nasa.gov/neo/rest/v1'

exports.browse = functions.https.onCall(async (data, context) => {

    if(!API_KEY) {
        throw new functions.https.HttpsError('unauthenticated', "No NeoWs API key provided.")
    }

    try {
        const neoWsResponse = await axios.get(`${BASE_URL}/neo/browse`, {
            params: {
                size: 10,
                api_key: API_KEY
            }
        })

        const listOfNeos = neoWsResponse.data.near_earth_objects
        const extractedList = listOfNeos.map(({id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data}) => ({id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data}))
        return extractedList
    }
    catch(error) {
        throw new functions.https.HttpsError('unknown', error.message)
    }
});

exports.dateRange = functions.https.onCall(async (data, context) => {

    const startDate = data.startDate
    const endDate = data.endDate

    if(!API_KEY) {
        throw new functions.https.HttpsError('unauthenticated', "No NeoWs API key provided.")
    }

    try {
        const neoWsResponse = await axios.get(`${BASE_URL}/feed`, {
            params: {
                start_date: startDate,
                end_date: endDate,
                detailed: false,
                api_key: API_KEY
            }
        })

        const dateWiseNeos = neoWsResponse.data.near_earth_objects
        const extractedList = Object.keys(dateWiseNeos).map(neos => dateWiseNeos[neos]).flat().map(({id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data}) => ({id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data}))
        extractedList.sort((neo1, neo2) => neo1.close_approach_data[0].miss_distance.kilometers - neo2.close_approach_data[0].miss_distance.kilometers)
        return extractedList.slice(0,10)
    }
    catch(error) {
        throw new functions.https.HttpsError('unknown', error.message)
    }
    
})
