import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const questionsCollection = db.collection('questions')
const answersCollection = db.collection('answers')

export { db, auth, usersCollection, questionsCollection, answersCollection }
