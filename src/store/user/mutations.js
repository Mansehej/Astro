export function setUserDetails (state, payload) {
    state.userDetails = payload;
}   

export function setFavorites(state, payload) {
    state.favorites = payload;
}

export function addFavorite(state, payload) {
    state.favorites[payload] = true;
}

export function removeFavorite(state, payload) {
    state.favorites[payload] = false;
}