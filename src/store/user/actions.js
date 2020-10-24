import { firebaseAuth, firebaseFunctions } from "boot/firebase";

export function registerUser({ }, payload) {
    return firebaseAuth
        .createUserWithEmailAndPassword(
            payload.email,
            payload.password
        )
        .then((response) => {
            response.user.updateProfile({
                displayName: payload.name,
            });
            return { success: true }
        })
        .catch((error) => {
            return { success: false, message: error.message }
        });
}

export function loginUser({ }, payload) {
    return firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
            return { success: true };
        })
        .catch((error) => {
            let errorText = ""
            if (error.code == "auth/user-not-found") {
                errorText = "User does not exist!";
            } else if (error.code == "auth/wrong-password") {
                errorText = "Incorrect password!";
            }
            return { success: false, message: errorText }
        });
}


export function logoutUser({}, payload) {
    return firebaseAuth.signOut();
}

export function handleAuthStateChanged({ commit, dispatch }, payload) {
    firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            commit('setUserDetails', {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                photo: user.photoURL
            })
            dispatch("getFavorites")
            this.$router.push('/')
        }
        else {
            commit('setUserDetails', {})
            commit('setFavorites', {})
            this.$router.replace('/auth')
        }
    })
}

export function getFavorites({ commit }, payload) {
    const favoritesGetter = firebaseFunctions.httpsCallable("getFavorites");
    return favoritesGetter({})
        .then(function (result) {
            const favorites = result.data ?? {};
            commit('setFavorites', favorites)
            return favorites;
        })
        .catch((error) => {
          return {}
        });
}

export function addFavorite({ commit }, payload) {
    const favoritesGetter = firebaseFunctions.httpsCallable("addFavorite");
    commit('addFavorite', payload.asteroidId)
    return favoritesGetter({ asteroidId: payload.asteroidId })
        .then(function (result) {
            return { success: true };
        })
        .catch(function (error) {
            return { success: false, message: error.message }
        })
}