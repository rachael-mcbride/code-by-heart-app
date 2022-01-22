import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyA15LoUo8kEjr9rEPf0QiJwHSQDHrCu58M",
  authDomain: "code-by-heart.firebaseapp.com",
  projectId: "code-by-heart",
  storageBucket: "code-by-heart.appspot.com",
  messagingSenderId: "1045668874982",
  appId: "1:1045668874982:web:a2a801d8031f4f96a4c927",
  measurementId: "G-6BEQC1R94S",
};

// this is asynchronous b/c we're making an API request to Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // if user isn't logged in, just return

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // here, we check if there's data, and if not, we create it from our userAuth obj
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

// sets up basic authorization functionality + firestore db
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// sets up ability to log in with Google (via pop-up)
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
