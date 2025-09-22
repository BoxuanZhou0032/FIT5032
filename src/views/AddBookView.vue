<template>
  <div class="container mt-5 p-4 shadow rounded bg-light">
    <h2 class="mb-4 text-center">📚 Firestore Book Manager</h2>

    <form @submit.prevent="addBook" class="row g-3">
      <div class="col-md-4">
        <label for="isbn" class="form-label">ISBN</label>
        <input
          type="number"
          v-model="isbn"
          id="isbn"
          class="form-control"
          placeholder="Enter ISBN"
          required
        />
      </div>
      <div class="col-md-4">
        <label for="name" class="form-label">Book Name</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="form-control"
          placeholder="Enter Book Name"
          required
        />
      </div>
      <div class="col-md-4">
        <label for="category" class="form-label">Category</label>
        <input
          type="text"
          v-model="category"
          id="category"
          class="form-control"
          placeholder="Enter Category"
        />
      </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-success px-4">➕ Add Book</button>
      </div>
    </form>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>

    <hr class="my-4" />

    <div class="mb-3">
      <button class="btn btn-primary me-2" @click="fetchBooks">📖 Show All Books</button>
      <button class="btn btn-warning me-2" @click="queryBooks">🔍 ISBN > 1000</button>
      <button class="btn btn-secondary me-2" @click="orderByName">🔡 Order by Name</button>
      <button class="btn btn-dark me-2" @click="limitBooks">⏳ Limit 3 Books</button>
    </div>

    <ul class="list-group">
      <li
        v-for="book in books"
        :key="book.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ book.name }}</strong> — ISBN: {{ book.isbn }} (📂
          {{ book.category || 'Uncategorized' }})
        </div>
        <div>
          <button class="btn btn-sm btn-info me-2" @click="updateBook(book.id, book.name)">
            ✏️ Update
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">🗑️ Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  doc,
} from 'firebase/firestore'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const category = ref('')
    const books = ref([])
    const successMessage = ref('')
    const errorMessage = ref('')

    const addBook = async () => {
      try {
        await addDoc(collection(db, 'books'), {
          isbn: Number(isbn.value),
          name: name.value,
          category: category.value || 'Uncategorized',
        })
        successMessage.value = `✅ Book "${name.value}" added successfully!`
        errorMessage.value = ''
        isbn.value = ''
        name.value = ''
        category.value = ''
        await fetchBooks()
      } catch (error) {
        errorMessage.value = '❌ Failed to add book.'
        console.error(error)
      }
    }

    const fetchBooks = async () => {
      books.value = []
      const querySnapshot = await getDocs(collection(db, 'books'))
      querySnapshot.forEach((docSnap) => {
        books.value.push({ id: docSnap.id, ...docSnap.data() })
      })
    }

    const queryBooks = async () => {
      books.value = []
      const q = query(
        collection(db, 'books'),
        where('isbn', '>', 100000),
        orderBy('isbn'),
        limit(5),
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((docSnap) => {
        books.value.push({ id: docSnap.id, ...docSnap.data() })
      })
    }

    const orderByName = async () => {
      books.value = []
      const q = query(collection(db, 'books'), orderBy('name', 'asc'))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((docSnap) => {
        books.value.push({ id: docSnap.id, ...docSnap.data() })
      })
    }

    const limitBooks = async () => {
      books.value = []
      const q = query(collection(db, 'books'), limit(3))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((docSnap) => {
        books.value.push({ id: docSnap.id, ...docSnap.data() })
      })
    }

    const updateBook = async (id, oldName) => {
      try {
        const newName = prompt('Enter new book name:', oldName)
        if (!newName) return
        const bookRef = doc(db, 'books', id)
        await updateDoc(bookRef, { name: newName })
        successMessage.value = '✅ Book updated successfully!'
        await fetchBooks()
      } catch (error) {
        console.error('Error updating book:', error)
      }
    }

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id))
        successMessage.value = '🗑️ Book deleted successfully!'
        await fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }

    return {
      isbn,
      name,
      category,
      books,
      addBook,
      fetchBooks,
      queryBooks,
      orderByName,
      limitBooks,
      updateBook,
      deleteBook,
      successMessage,
      errorMessage,
    }
  },
}
</script>
