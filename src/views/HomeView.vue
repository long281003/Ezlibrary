<script setup>
import Books from '@/components/Books.vue';
import store from '@/store';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { computed, ref } from 'vue';
import SpinnerLoading from '@/componentsHTMl/SpinnerLoading.vue';
import TagView from './TagView.vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';

const keyword = ref('')
const books = ref([])
const page = ref(0)
const size = ref(20)
const currentPage = computed(() => page.value + 1)
const totalPage = ref(0)
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
     await store.dispatch('searchBooks', { keyword: keyword.value, page: page.value, size: size.value })
      books.value = store.getters.getSearchBook.data;
      totalPage.value = store.getters.getSearchBook.totalPages;
    } else {
     await fetchBooks()
    }
    isLoading.value = false
  }, 1000)
}

watch(currentPage, (newPage) => {
  page.value = newPage - 1
  fetchBooks();
})

const prePage = async () => {
  if (page.value > 0) {
    page.value--
    if (keyword.value) {
     await searchBook()
    }
   await fetchBooks()
  }
}

const nextPage = async () => {
  if (page.value < totalPage.value - 1) {
    page.value++
    if (keyword.value) {
     await searchBook()
    }
   await fetchBooks()
  }
}

const handleClick = (targetPage) => {
  if (targetPage < currentPage.value && targetPage >= 1) { 
    page.value = targetPage - 1;
    prePage();
  } else if (targetPage > currentPage.value && targetPage <= totalPage.value) { 
    page.value = targetPage - 1;
    nextPage();
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
            <div v-if="books.length > 0">
              <div class="flex m-5 justify-end">
                <!-- <div class="flex">
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
                </div> -->
                <VueAwesomePaginate :total-items="totalPage * size" :items-per-page="size" :max-pages-shown="3"
                  v-model="currentPage" @click="handleClick" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
    .pagination-container {
      display: flex;
  
      column-gap: 10px;
    }
  
    .paginate-buttons {
      height: 40px;
  
      width: 40px;
  
      border-radius: 20px;
  
      cursor: pointer;
  
      background-color: rgb(242, 242, 242);
  
      border: 1px solid rgb(217, 217, 217);
  
      color: black;
    }
  
    .paginate-buttons:hover {
      background-color: #d8d8d8;
    }
  
    .active-page {
      background-color: #3498db;
  
      border: 1px solid #3498db;
  
      color: white;
    }
  
    .active-page:hover {
      background-color: #2988c8;
    }
</style>