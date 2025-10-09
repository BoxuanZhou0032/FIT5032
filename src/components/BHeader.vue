<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active"
            >Get Book Count</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active"
            >Weather Check</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active"
            >Count Book API</router-link
          >
          <template v-if="!user">
            <li class="nav-item">
              <router-link to="/Firelogin" class="nav-link" active-class="active"
                >Sign in</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/FireRegister" class="nav-link" active-class="active">
                Register
              </router-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <router-link to="/addBook" class="nav-link" active-class="active"
                >Add Book</router-link
              >
            </li>
            <li class="nav-item" v-if="role === 'admin'">
              <router-link to="/admin" class="nav-link" active-class="active">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/logout" class="nav-link" active-class="active">Logout</router-link>
            </li>
          </template>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init'

const user = ref(null)
const role = ref(null)
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, async (u) => {
    user.value = u
    role.value = null
    if (u) {
      // 从 Firestore 取角色
      const snap = await getDoc(doc(db, 'users', u.uid))
      role.value = snap.exists() ? snap.data().role : 'user'
      console.log('[Header] user:', u.email, 'role:', role.value)
    }
  })
})
</script>
