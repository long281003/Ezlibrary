<script setup>
import { ref, onMounted } from 'vue';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { axiosMember } from '@/servives/axiosClient';
import { computed } from 'vue';
import store from '@/store';
import { useRoute } from 'vue-router';
import IconHeart from './icons/IconHeart.vue';
import IconUnheart from './icons/IconUnheart.vue';
// import apiMixin from '@/Mixins/MixinAPI';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const router = useRoute()
const heart = ref(false) 
const books = computed(() => store.getters.getBookId)

const id = router.params.id
// const fetchEbook = async () => {
//     if (books.value.type === 'EBook') {
//          try {
//              const res = await apiMixin.getWithAuth(`/book/ebook?bookId=${id}`)
//              return res.data
//         } catch (error) {
//             console.log(error)
//         }
//     } else {
//         try {
//             const res = await apiMixin.getWithAuth(`/book/audio?bookId=${id}`)
//             console.log(res)
//             return res.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

const postImage = computed(() => {
    return `http://localhost:8080/book/cover?bookId=` + id
})

onMounted(async () => {
    if (id) {
        await store.dispatch('fetchBookId', id)
        // await fetchEbook()
    }      
})
const favourite = () => {
    heart.value = !heart.value
}

</script>

<template>
    <div class=" mx-auto px-20">
        <div class="flex">
            <div class="max-w-[1000px]">
                <div class="w-[350px] lg:ml-6 md:ml-6 sm:ml-6">
                    <img :src="postImage" class="rounded-md shadow-2xl" width="400" />
                    <div class="grid grid-cols-3 mt-9 gap-6">
                        <button v-for="tagBook of books.tags" :key="tagBook.id"
                            class="border rounded-md shadow-md bg-gray-300 hover:bg-gray-400">
                            <router-link :to="{ name: 'booktag', params:{id: tagBook.id}}" >
                                {{ tagBook.name}}
                            </router-link></button>
                    </div>
                </div>
            </div>
            <div class="ml-14 pt-48">
                <h1 class="text-3xl font-semibold  mb-4">{{ books.title }}</h1>
                <div class="text-xl font-light">
                    <p>tác giả: {{ books.author }}</p>
                    <p class="my-2">Năm xuất bản: {{ books.puslisher }}</p>
                    <p>Thể loại: {{ books.type }}</p>
                    <p class="my-2">Chủ đề: Tác phẩm phá án, kinh dị</p>
                    <div class="flex gap-3 my-4">
                        <button class="flex gap-1 p-2 border bg-emerald-300 hover:bg-emerald-400 rounded-md"
                            @click="favourite">
                            <span class="inset-y-0 flex items-center mt-1 cursor-pointer">
                                <IconHeart v-if="heart" />
                                <IconUnheart v-else />
                            </span>
                            yêu thích</button>
                        <router-link @click="fetchEbook" v-if="books.type === 'EBook'" :to="{ name: 'readbook' , params: {id: books.id}}"
                            class="p-2 border bg-emerald-300 hover:bg-emerald-400 rounded-md cursor-pointer">Đọc trực
                            tiếp
                        </router-link>
                        <div v-else>
                            <audio controls class="w-96">
                                <source :src="`http://localhost:8080/book/sample/audio?bookId=${id}`" type="audio/ogg">
                                <source :src="`http://localhost:8080/book/sample/audio?bookId=${id}`" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>
                    <span>
                        {{ books.description }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
