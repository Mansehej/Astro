export function setUserDetails (state, payload) {
    state.userDetails = payload;
}   

export function setFavorites(state, payload) {
    console.log("setting favorites");
    state.favorites = payload;
}