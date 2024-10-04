<script setup>
import BookItem from './BookItem.vue';
const { books } = defineProps({
    books: {
        required: true,
        type: Object
    },
});
</script>

<template>
    <div>
        <div class="p-6 mx-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            <BookItem v-for="book of books" :key="book.id" :book="book" />
        </div>
    </div>
</template>

<style>
    
</style>