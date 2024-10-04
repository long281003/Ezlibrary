<script setup>

const props = defineProps(['show'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}
</script>

<template>
    <div class="flex mt-10 justify-center items-center">
        <div v-show="props.show" @click.self="closeModal"
            class="absolute mt-12 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="relative max-w-2xl bg-white rounded-md shadow-xl ">
                <div class="w-[450px]">
                    <button @click="closeModal"
                        class="flex mt-1 mr-1 text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <div class="text-center">
                        <h1 class=" text-2xl text-emerald-400 font-semibold"></h1>
                        <div class="flex justify-center my-3 ">
                            <img src="../assets/codeqr.jpg" width="300" />
                        </div>
                        <h2 class="py-4 text-lg"></h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
