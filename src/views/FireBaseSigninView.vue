<template>
  <div class="container mt-5 p-4 shadow rounded bg-light" style="max-width: 480px">
    <h1 class="mb-4 text-center">Sign in</h1>

    <p><input type="text" placeholder="Email" v-model="email" class="form-control mb-2" /></p>
    <p>
      <input type="password" placeholder="Password" v-model="password" class="form-control mb-3" />
    </p>
    <p class="text-center">
      <button @click="signin" class="btn btn-primary w-100">Sign in via Firebase</button>
    </p>

    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async () => {
      console.log('✅ Firebase Sign-in Successful!')
      console.log('[Auth] currentUser:', {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
      })

      const snap = await getDoc(doc(db, 'users', auth.currentUser.uid))
      if (snap.exists()) {
        console.log('[Auth] role:', snap.data().role)
      } else {
        console.log('[Auth] role: not set, default = user')
      }

      router.push('/logout')
    })
    .catch((error) => {
      console.error(error.code)
      errorMessage.value = '❌ Sign in failed: ' + error.code
    })
}
</script>
