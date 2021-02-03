// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const CLIENT_CONFIG = {
  apiKey: 'AIzaSyBmdvp-qd5mRbFoZcAnCLmr2rtlPIQlZkk',
  authDomain: 'torre-303519.firebaseapp.com',
  projectId: 'torre-303519',
  storageBucket: 'torre-303519.appspot.com',
  messagingSenderId: '796183977352',
  appId: '1:796183977352:web:07845f6d02ab651aa1ee3d'
}

if (!firebase.apps.length) {
  firebase.initializeApp(CLIENT_CONFIG)
} else {
  firebase.app() // if already initialized, use that one
}

export { firebase }
