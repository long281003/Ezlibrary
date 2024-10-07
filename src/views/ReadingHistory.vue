<script setup>
import store from '@/store';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';

const nameBook = ref('')
const author = ref('')
const typebook = ref('')
const yearPublication = ref('')
const status = ref('')
const language = ref('')
const page = ref(0)
const size = ref(6)
const totalPage = ref(0)
const currentPage = computed(() => page.value + 1)
const BookLoans = computed(() => store.getters.getLoan)

onMounted(async () => {
    await store.dispatch('fetchBookLoan', {page: page.value, size: size.value})
})

const searchBooks = async () => {
    const searchParams = {
        nameBook: nameBook.value,
        author: author.value,
        typebook: typebook.value,
        yearPublication: yearPublication.value,
        language: language.value,
        status: status.value,
        page: page.value,
        size: size.value,
    };

    await store.dispatch('fetchBookLoan', searchParams);
};

</script>

<template>
    <div class=" mx-auto px-4">
        <div class="mb-2 border p-2 bg-slate-100">
            <h1 class="text-2xl mb-4 font-bold">Tìm kiếm</h1>
            <form class="grid gap-3 mb-2 xl:grid-cols-6 md:grid-cols-2 ">
                <div>
                    <label class="block font-semibold">Tên sách</label>
                    <input type="text" placeholder="please enter" v-model="nameBook"
                        class=" w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3" />
                </div>
                <div>
                    <label class="block font-semibold">Tác giả</label>
                    <input type="text" placeholder="please enter" v-model="author"
                        class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3" />
                </div>
                <div>
                    <label class="block font-semibold">Thể loại</label>
                    <input type="text" placeholder="please enter" v-model="typebook"
                        class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3" />
                </div>
                <div>
                    <label class="block font-semibold">Năm xuất bản</label>
                    <input type="text" placeholder="please enter" v-model="yearPublication"
                        class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3" />
                </div>
                <div>
                    <label class="block font-semibold">Ngôn ngữ</label>
                    <input type="text" placeholder="please enter" v-model="language"
                        class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3" />
                </div>
                <div>
                    <label class="block font-semibold">Tìm kiếm theo</label>
                    <select v-model="status"
                        class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3">
                        <option>Tất cả</option>
                        <option>Đã đọc xong</option>
                        <option>Chưa đọc xong</option>
                    </select>
                </div>
            </form>
            <div class="flex justify-end gap-4">
                <button @click="searchBooks" class="bg-emerald-400  font-semibold p-2 rounded-lg mb-2">Tìm kiếm
                </button>
                <button class="bg-emerald-400  font-semibold p-2 rounded-lg mb-2">Quay lại </button>
            </div>
        </div>
        <h1 class="text-4xl text-center mb-4">Lịch sử đọc</h1>
        <div class="grid grid-cols-2">
            <div v-for="bookLoan of BookLoans" :key="bookLoan.id" class="py-8 flex gap-4 ml-10">
                <router-link>
                    <img :src="`http://localhost:8080/book/cover?bookId=${bookLoan.book?.id}`" width="150" />
                </router-link>
                <div>
                    <div class="text-lg">
                        <h1 class="text-3xl">{{ bookLoan.book?.title }}</h1>
                        <p>Tác giả: {{ bookLoan.book?.author }}</p>
                        <p>Trạng thái: full</p>
                        <p>Ngôn ngữ: {{ bookLoan.book?.language }}</p>
                        <p>Đang đọc</p>
                    </div>
                    <div class="grid grid-cols-3 mt-3 gap-1">
                        <router-link v-for="tags of bookLoan.book?.tags" :key="tags.id"
                            :to="{ name: 'booktag' , params:{id: tags.id}}"
                            class="text-center border rounded-md shadow-md p-1 bg-gray-300 hover:bg-gray-400">{{
                            tags.name
                            }}</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex m-5 justify-center">
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
            <VueAwesomePaginate :total-items="totalPage * size" :items-per-page="size" :max-pages-shown="5"
                v-model="currentPage" />
        </div>
    </div>
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