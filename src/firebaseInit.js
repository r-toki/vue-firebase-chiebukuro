import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDpbiTaocmzfL_IEUoid9G1yypaGSj_g7Q',
  authDomain: 'vue-firebase-chiebukuro.firebaseapp.com',
  databaseURL: 'https://vue-firebase-chiebukuro.firebaseio.com',
  projectId: 'vue-firebase-chiebukuro',
  storageBucket: 'vue-firebase-chiebukuro.appspot.com',
  messagingSenderId: '578353730992',
  appId: '1:578353730992:web:177e5ec73902437363f275',
  measurementId: 'G-2B6CESYCL8'
}

export default firebase.initializeApp(firebaseConfig)
