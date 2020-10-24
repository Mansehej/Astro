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

exports.getFavoritesMap = getFavoritesMap