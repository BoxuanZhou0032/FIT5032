<template>
  <div class="add-book container mt-5 p-4 shadow rounded bg-light">
    <h2 class="mb-4 text-center">➕ Add New Book</h2>

    <form @submit.prevent="addBook" class="row g-3">
      <!-- ISBN -->
      <div class="col-12">
        <label for="isbn" class="form-label">ISBN</label>
        <input
          type="text"
          v-model="isbn"
          id="isbn"
          class="form-control"
          placeholder="Enter book ISBN"
          required
        />
      </div>

      <!-- Name -->
      <div class="col-12">
        <label for="name" class="form-label">Book Name</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="form-control"
          placeholder="Enter book name"
          required
        />
      </div>

      <!-- Submit Button -->
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary px-4">Add Book</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'

import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value,
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    return {
      isbn,
      name,
      addBook,
    }
  },
  components: {
    BookList,
  },
}
</script>
