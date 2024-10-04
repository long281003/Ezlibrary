<script setup>
import store from '@/store';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const nameBook = ref('')
const author = ref('')
const typebook = ref('')
const yearPublication = ref('')
const status = ref('')
const language = ref('')
const page = ref(0)
const size = ref(10)
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
                <button @click="searchBooks" class="bg-emerald-400  font-semibold p-2 rounded-lg mb-2">Tìm kiếm </button>
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
    </div>
</template>

<style></style>