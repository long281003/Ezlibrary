<script setup>
import { computed } from 'vue';



const { book } = defineProps({
    book: Object,
});

const postImage = computed(() => {
    return 'http://localhost:8080/book/cover?bookId=' + book.id
})
</script>

<template>
    <div class="pt-7">
        <router-link :to="{ name: 'detailbook', params: {id: book.id}}">
                <img loading="lazy" :src="postImage" class="b-lazy hover:opacity-75 trasition easy-in-out duration-150 rounded-lg w-58"
                    width="300" height="392" />
        </router-link>
        <div class="text-center mt-2 font-bold">
            <p>{{ book.title }}</p>
            <p>-{{ book.author }}-</p>
        </div>
    </div>
</template>
