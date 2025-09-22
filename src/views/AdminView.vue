<!-- src/views/AdminView.vue -->
<template>
  <div class="container mt-5 p-4 shadow rounded bg-light">
    <h2>Admin Area</h2>
    <p class="text-muted">Only users with role <code>admin</code> can view this page.</p>
    <router-link class="btn btn-outline-secondary" to="/logout">Go to Logout</router-link>
  </div>
</template>
