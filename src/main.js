import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAngHoBsZGFd5V7_RYr0fnwR5JfHbaqW44',
  authDomain: 'week7-boxuan.firebaseapp.com',
  projectId: 'week7-boxuan',
  storageBucket: 'week7-boxuan.firebasestorage.app',
  messagingSenderId: '34566654615',
  appId: '1:34566654615:web:d46654a7be0fb5df8eb7d2',
}

// Initialize Firebase
initializeApp(firebaseConfig)
