import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FireBaseSigninView from '@/views/FireBaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import LogoutView from '@/views/LogoutView.vue'
import AdminView from '@/views/AdminView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init.js'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI,
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FireBaseSigninView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/addBook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresRole: 'admin' },
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (!to.meta.requiresRole) {
    return next()
  }

  if (!user) {
    console.warn('[Router] FireLogin')
    return next('/FireLogin')
  }

  const snap = await getDoc(doc(db, 'users', user.uid))
  const role = snap.exists() ? snap.data().role : 'user'
  console.log('[Router] :', role)

  if (role === to.meta.requiresRole) {
    return next()
  } else {
    console.warn('[Router]  /logout')
    return next('/logout')
  }
})

export default router
