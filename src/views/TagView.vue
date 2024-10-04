<script setup>
import store from '@/store';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
const tags = computed(() => store.getters.getTag)
const selectedTag = ref(null)

onMounted( async () => {
    await store.dispatch('fetchTag')
})

const selectTag = (tagId) => {
    selectedTag.value = tagId
}
</script>

<template>
    <div class=" max-w-[250px] h-full bg-white">
        <div class="border-b p-4 text-lg text-center mb-4">Khám phá theo danh mục</div>
        <div>
            <ul>
                <li v-for="tag of tags" :key="tag.id" :class="{ 'active': selectedTag === tag.id }"
                    class="pb-3" @click="selectTag(tag.id)">
                        <router-link :to="{ name: 'booktag', params: {id: tag.id} }"
                            @click="$emit('select-tag', tag.id)"> ●
                            {{ tag.name }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
li {
    padding: 8px;
    transition: background-color 0.3s ease;
}

li.active {
    background-color: #c8c8c8;
    color: red;
}

li:hover {
    color: #ff7675;
}
</style>