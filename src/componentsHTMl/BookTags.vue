<script setup>
import Books from '@/components/Books.vue';
import store from '@/store';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SpinnerLoading from '@/componentsHTMl/SpinnerLoading.vue';
import TagView from '@/views/TagView.vue';

const books = ref([])
const page = ref(0)
const size = ref(20)
const currentPage = computed(() => page.value + 1)
const totalPage = ref(1)
const keyword = ref('')
const router = useRoute()
const id = router.params.id
const isLoading = ref(false)
const selectedTagId = ref(null);

const bookTags = computed(() => store.getters.getTagId)
watch(bookTags, (newBooks) => {
    books.value = newBooks.data
    totalPage.value = newBooks.totalPages
})

const fetchBooktags = async (tagId) => {
    isLoading.value = true
    setTimeout(async () => {
        await store.dispatch('fetchTagAllbook', { id: tagId, page: page.value, size: size.value })
    isLoading.value = false
    }, 1000)
}

const searchBook = async () => {
    isLoading.value = true
    setTimeout(async () => {
        if (keyword.value) {
            await store.dispatch('searchTagBooks', {
                keyword: keyword.value,
                id: selectedTagId.value,
                page: page.value,
                size: size.value
            })
            books.value = store.getters.getSearchTagBook.data;
            totalPage.value = store.getters.getSearchTagBook.totalPages;
        } else {
            await fetchBooktags(selectedTagId.value);
        }
        isLoading.value = false
    }, 1000)
}
onMounted(async () => {
    if (id) { 
        selectedTagId.value = id
       await fetchBooktags(selectedTagId.value)
    }
    await store.dispatch('fetchTag')
})

const handleTagSelection = (tagId) => {
    selectedTagId.value = tagId;
    page.value = 0; 
    fetchBooktags(tagId); 
};
const prePage = () => {
    if (page.value > 0) {
        page.value--
        fetchBooktags(selectedTagId.value);
    }
}

const nextPage = () => {
    if (page.value < totalPage.value - 1) {
        page.value++
        fetchBooktags(selectedTagId.value);
    }
}

</script>

<template>
    <div>
        <div class="flex justify-end pb-10">
            <input type="text" placeholder="Tìm kiếm" v-model="keyword" @keyup.prevent="searchBook"
                class="w-1/2 border border-gray-400 text-gray-900 text-sm  rounded-full p-3" />
        </div>
        <div class="flex">
            <div class="w-[380px]">
                <TagView @select-tag="handleTagSelection" />
            </div>
            <div class="w-[1600px] h-full">
                <div v-if="books.length === 0 && keyword" class="text-center font-bold">
                    Không tìm thấy sách
                </div>
                <div class="bg-white">
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
                                    <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                    </svg>
                                    Previous
                                </button>
                                <span class="mx-3 mt-1">{{ currentPage }} / {{ totalPage }}</span>
                                <button @click="nextPage" :disabled="page >= totalPage - 1"
                                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>