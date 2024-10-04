<script setup>
import Books from '@/components/Books.vue';
import store from '@/store';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { computed, ref } from 'vue';
import SpinnerLoading from '@/componentsHTMl/SpinnerLoading.vue';
import TagView from './TagView.vue';

const keyword = ref('')
const books = ref([])
const page = ref(0)
const size = ref(20)
const currentPage = computed(() => page.value + 1)
const totalPage = ref(1)
const isLoading = ref(false)
const token = sessionStorage.getItem('authtoken')

const fetchBooks = async () => {
  isLoading.value = true
  setTimeout(async () => {
    await store.dispatch('fetchBook', { page: page.value, size: size.value })
    isLoading.value = false
  }, 1000)
}

const allBooks = computed(() => store.getters.getBook)

watch(allBooks, (newBooks) => {
  books.value = newBooks.data
  totalPage.value = newBooks.totalPages
})

onMounted(() => {
  searchBook()
  fetchBooks()
})
const searchBook = async () => {
  isLoading.value = true
  setTimeout(async () => {
    if (keyword.value) {
      const res = await store.dispatch('searchBooks', { keyword: keyword.value, page: page.value, size: size.value })
     console.log(res)
      books.value = store.getters.getSearchBook.data;
      totalPage.value = store.getters.getSearchBook.totalPages;
    } else {
     await fetchBooks()
    }
    isLoading.value = false
  }, 1000)
}

const prePage = () => {
  if (page.value > 0) {
    page.value--
    fetchBooks()
  }
}

const nextPage = () => {
  if (page.value < totalPage.value - 1) {
    page.value++
    fetchBooks()
  }
}
</script>

<template>
  <main>
    <div class="mx-auto">
      <div class="flex justify-end pb-10">
        <input type="text" placeholder="Tìm kiếm" v-model="keyword" @keyup.prevent="searchBook"
          class="w-1/2 border border-gray-400 text-gray-900 text-sm  rounded-full p-3" />
      </div>
      <div class="flex">
        <div v-if="token" class="w-[300px]">
          <TagView />
        </div>
        <div :class="[token ? 'w-[1300px] h-full': '']">
          <div :class="[token ? 'bg-white p-1' : '',]">
            <div v-if="books.length === 0 && keyword" class="text-center font-bold">
              Không tìm thấy sách
            </div>
            <div class="text-center p-10" v-if="isLoading">
              <SpinnerLoading />
            </div>
            <div>
              <Books v-if="!isLoading" :books="books" />
            </div>
            <div v-show="totalPage > 1" v-if="books.length > 0">
              <div class="flex m-5 justify-end">
                <div class="flex">
                  <button @click="prePage" :disabled="page === 0"
                    class="flex items-center justify-center px-4 h-10  text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                    <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Previous
                  </button>
                  <span class="mx-3 mt-1">{{ currentPage }} / {{ totalPage }}</span>
                  <button @click="nextPage" :disabled="page >= totalPage - 1"
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
  
</style>