<template>
  <div class="container">
    <h1>📚 Get All Books</h1>

    <div v-if="loading" class="loading">Loading books...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="books">
      <h3>Book Data</h3>
      <pre class="json-box">{{ formattedBooks }}</pre>
    </div>

    <button @click="fetchAllBooks" class="refresh-btn">Refresh</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetAllBookAPI',
  data() {
    return {
      books: null,
      loading: false,
      error: null,
    }
  },
  computed: {
    formattedBooks() {
      return JSON.stringify(this.books, null, 2)
    },
  },
  methods: {
    async fetchAllBooks() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axios.get(
          'https://us-central1-week7-boxuan.cloudfunctions.net/getAllBooks',
          { timeout: 15000 },
        )
        this.books = data
      } catch (err) {
        console.error('GET /getAllBooks failed:', {
          message: err?.message,
          code: err?.code,
          status: err?.response?.status,
          statusText: err?.response?.statusText,
          data: err?.response?.data,
        })

        this.error =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch books.'
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.fetchAllBooks()
  },
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}

.loading {
  color: #888;
}

.error {
  color: red;
  font-weight: bold;
}

.json-box {
  text-align: left;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  margin-top: 10px;
}

.refresh-btn {
  margin-top: 15px;
  background-color: #0984e3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: #74b9ff;
}
</style>
