const functions = require('firebase-functions');
const { getFromNeoWs, extractFields, mergeNeoDates, sortByApproach, getFavoritesMap, addFavorite, removeFavorite } = require("./utils");

const FIREBASE_REGION = "europe-west1"

// Used HTTP Callable functions instead of HTTP requests
// This is because all middleware (CORS), serialization, deserialization will be automatically handled
// And the only app that is going to call these functions is our firebase app.

exports.browse = functions.region(FIREBASE_REGION).https.onCall(async (data, context) => {

    try {
        const listOfNeos = await getFromNeoWs('/neo/browse', { size: 10 })
        const extractedList = extractFields(listOfNeos)
        return extractedList
    }
    catch (error) {
        throw new functions.https.HttpsError(error.message)
    }

});

exports.dateRange = functions.region(FIREBASE_REGION).https.onCall(async (data, context) => {

    const startDate = data.startDate
    const endDate = data.endDate

    try {
        const dateWiseNeos = await getFromNeoWs('/feed', { start_date: startDate, end_date: endDate, detailed: false })
        const extractedList = extractFields(mergeNeoDates(dateWiseNeos))
        const extractedListByApproach = sortByApproach(extractedList)
        const slicedAndSortedList = extractedListByApproach.slice(0, 10)
        return slicedAndSortedList
    }
    catch (error) {
        throw new functions.https.HttpsError(error.message)
    }

})

exports.searchById = functions.region(FIREBASE_REGION).https.onCall(async (data, context) => {

    const id = data.id

    try {
        const neoInformation = await getFromNeoWs(`/neo/${id}`, {})
        const extractedList = extractFields(neoInformation)
        return extractedList
    }
    catch (error) {
        throw new functions.https.HttpsError(error.message)
    }

})

exports.getFavorites = functions.region(FIREBASE_REGION).https.onCall(async (data, context) => {
    
    if (!context.auth.uid) {
        throw new functions.https.HttpsError("unauthenticated");
    }

    return await getFavoritesMap(context.auth.uid);

})

exports.addFavorite = functions.region(FIREBASE_REGION).https.onCall(async (data, context) => {

    if (!context.auth.uid) {
        throw new functions.https.HttpsError("unauthenticated");
    }

    if (!data.asteroidId) {
        throw new functions.https.HttpsError("invalid_argument");
    }

    return await addFavorite( context.auth.uid, data.asteroidId)
    
})

exports.removeFavorite = functions.region(FIREBASE_REGION).https.onCall(async (data, context) => {

    if (!context.auth.uid) {
        throw new functions.https.HttpsError("unauthenticated");
    }

    if (!data.asteroidId) {
        throw new functions.https.HttpsError("invalid_argument");
    }

    return await removeFavorite( context.auth.uid, data.asteroidId)
    
})