<script setup>
import store from '@/store';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const router = useRoute()
const id = router.params.id
const bookId = computed(() => store.getters.getBookId)

const postImage = computed(() => {
    return `http://localhost:8080/book/cover?bookId=` + id
})

onMounted(async () => {
    if (id) {
        await store.dispatch('fetchBookId', id)
    }
})
</script>

<template>
    <div class="">
        <div class="flex gap-3">
            <div class="w-[1200px] h-[1000px]">
                <div class="my-4">
                    <iframe :src="`http://localhost:8080/book/sample/ebook?bookId=${id}`" width="100%" height="800px"
                        frameborder="0">
                    </iframe>
                </div>
            </div>
            <div class="border"></div>
            <div class="w-[300px]">
                <div class="flex justify-center">
                    <div>
                        <img :src="postImage" width="200" />
                        <div class="font-semibold text-lg text-center">
                            <p class="py-2">{{ bookId.title }}</p>
                            <p>- {{ bookId.author }} -</p>
                        </div>
                    </div>
                </div>
                <div class="pt-5">
                    <div class="bg-slate-200 text-center ">
                        <div class="border border-b-slate-400 p-3 mb-4">Top truyện ngắn</div>
                        <router-link v-for="tag of bookId.tags" :key="tag.id"
                            :to="{ name: 'booktag', params: {id: tag.id} }">
                            <p class="pb-3">{{tag.name }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
