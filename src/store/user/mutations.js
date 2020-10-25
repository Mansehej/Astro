export function setUserDetails (state, payload) {
    const name = state.userDetails.name
    state.userDetails = payload;
    if (name) {
        state.userDetails.name = name
    }
}   

export function addToUserDetails(state, payload) {
    state.userDetails[payload.key] = payload.value
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