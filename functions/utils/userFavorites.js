const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

async function getFavoritesMap(uid) {

    return db.collection('users').doc(uid).get()
        .then(document => {
            return document.data().favorites
        })
        .catch(error => {
            return {}
        })
}

async function addFavorite(uid, asteroidId) {

    const mapToUpdate = {
        favorites: {}
    };

    mapToUpdate.favorites[asteroidId] = true

    return db.collection('users').doc(uid).set(mapToUpdate, { merge: true })
        .then(() => {
            return true
        })
        .catch(error => {
            return error.message
        })
}

async function removeFavorite(uid, asteroidId) {

    const mapToUpdate = {
        favorites: {}
    };

    mapToUpdate.favorites[asteroidId] = false

    return db.collection('users').doc(uid).set(mapToUpdate, { merge: true })
        .then(() => {
            return true
        })
        .catch(error => {
            return error.message
        })
}

exports.getFavoritesMap = getFavoritesMap
exports.addFavorite = addFavorite
exports.removeFavorite = removeFavorite