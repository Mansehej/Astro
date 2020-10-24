import { firebaseAuth } from "boot/firebase";

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
