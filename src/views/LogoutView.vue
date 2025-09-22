<template>
  <div class="container mt-5 p-4 shadow rounded bg-light">
    <h2>Log out</h2>

    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>UID:</strong> {{ user.uid }}</p>
      <p><strong>Role:</strong> {{ role }}</p>
    </div>
    <div v-else>
      <p class="text-muted">No user signed in.</p>
    </div>

    <button class="btn btn-danger mt-3" @click="handleLogout">Log out</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init.js'

const router = useRouter()
const auth = getAuth()

const user = ref(null)
const role = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, async (u) => {
    user.value = u
    if (u) {
      console.log('[LogoutView] currentUser:', {
        uid: u.uid,
        email: u.email,
      })
      const snap = await getDoc(doc(db, 'users', u.uid))
      role.value = snap.exists() ? snap.data().role : 'user'
      console.log('[LogoutView] role:', role.value)
    } else {
      console.log('[LogoutView] no user signed in')
    }
  })
})

watch([user, role], () => {
  console.log('[LogoutView] state change:', {
    user: user.value ? { uid: user.value.uid, email: user.value.email } : null,
    role: role.value,
  })
})

const handleLogout = async () => {
  await signOut(auth)
  console.log('[Auth] logged out')
  router.push('/FireLogin')
}
</script>
