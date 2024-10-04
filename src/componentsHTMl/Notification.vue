<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import store from '@/store';
import { ref } from 'vue';
import { computed } from 'vue';

const isOpen = computed(() => store.getters.isAuthModalVisible)
const showLogin = ref(false)
const showRegister = ref(false)

const openModalLogin = () => {
    showLogin.value = true
    closeModal()
}
const openModalRegister = () => {
    showRegister.value = true
    closeModal()
}

const closeModal = () => {
    store.dispatch('closeAuthModal')
}

</script>

<template>
    <div class="flex justify-center items-center">
        <div v-show="isOpen" class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="relative max-w-2xl bg-white rounded-md shadow-xl ">
                <div class="w-[450px]">
                    <button @click="closeModal"
                        class="flex mt-1 mr-1 text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <div class="flex justify-center items-center">
                        <img src="../assets/warning.png" width="40" />
                        <h1 class="text-2xl font-semibold">Thông báo</h1>
                    </div>
                    <h1 class="text-center p-3 text-xl">
                        Bạn chưa đăng nhập. Bạn cần đăng nhập để truy cập
                    </h1>
                    <div class="flex flex-col items-center gap-2 pb-4">
                        <button @click="openModalLogin"
                            class="border w-48 bg-emerald-400 hover:bg-emerald-400 rounded-lg mx-2 p-2">Đăng nhập
                            ngay</button>
                        <button @click="openModalRegister"
                            class="border w-48 border-emerald-400 hover:bg-emerald-400 rounded-lg mx-2 p-2">Đăng ký tài
                            khoản mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Login :show="showLogin" @update:show="showLogin = $event" />
    <Register :show="showRegister" @update:show="showRegister = $event"/>
</template>

<style>
.d-login {
    z-index: 999;
}
</style>