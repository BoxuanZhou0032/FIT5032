<template>
  <div class="container mt-5 p-4 shadow rounded bg-light">
    <h2>Book Count</h2>
    <button class="btn btn-primary mt-3" @click="fetchBookCount" :disabled="loading">
      {{ loading ? 'Loading...' : 'Fetch Book Count' }}
    </button>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="bookCount !== null" class="alert alert-success mt-3">
      Total Books: {{ bookCount }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookCount: null,
      loading: false,
      error: null,
    }
  },
  methods: {
    async fetchBookCount() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('https://api.example.com/bookcount')
        this.bookCount = response.data.count
      } catch (error) {
        this.error = 'Failed to fetch book count. Please try again later.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
