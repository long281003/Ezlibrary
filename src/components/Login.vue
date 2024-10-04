<script setup>
import store from '@/store';
import { ref } from 'vue';
import router from '@/router';
import Register from './Register.vue';
import { toast } from "vue3-toastify";
import SendNewPassword from '@/components/Util/SendOTPPassword.vue'
import IconEye from './icons/IconEye.vue';
import IconClockEye from './icons/IconClockEye.vue';

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const showRegisterModal = ref(false)
const showmodalOTP = ref(false)
const emailError = ref(false)
const passwordError = ref(false)

const openModalRegister = () => {
    showRegisterModal.value = true
    closeModal()
}

const openModalOTPEmail = () => {
    showmodalOTP.value = true
    closeModal()
}

const props = defineProps(['show'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}

const handleLogin = async () => {
    if (!email.value.trim() || !password.value.trim() ) {
        toast.error('Vui lòng nhập thông tin')
    }
    try {
        const body = {
            email: email.value,
            password: password.value
        }
        const result = await store.dispatch('loginMember', body)
        if (result && result.data.responseCode === 0) {
            router.go(0)
            router.push('/')
            closeModal()
            toast.success("Đăng nhập thành công")
            router.push('/home');
        } else {
            emailError.value = true
            passwordError.value = true
            toast.error(result.data.data)
        }
    } catch (error) {
        console.log(error)
        
    }
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};

</script>

<template>

    <div v-if="props.show" class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-2 bg-white rounded-md shadow-xl">
            <div class="w-[450px]">
                <div>
                    <button @click="closeModal"
                        class="flex text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <h3 class="text-2xl text-center font-semibold">Đăng nhập</h3>
                </div>
                <form @submit.prevent="handleLogin" class="max-w-[370px] mx-auto mt-5">
                    <div>
                        <input type="text" placeholder="Email" v-model="email"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', emailError ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div class="relative mb-4">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu" v-model="password"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', passwordError ? 'border-red-500' : 'border-gray-300']" />
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            @click="toggleShowPassword">
                            <IconEye v-if="showPassword" />
                            <IconClockEye v-else />
                        </span>
                    </div>
                    <div class="text-emerald-300 font-semibold text-end">
                        <button @click="openModalOTPEmail">Quên mật khẩu</button>
                    </div>
                    <div>
                        <button class="bg-emerald-400 w-full font-semibold p-2 rounded-full mb-6">Đăng
                            nhập</button>
                    </div>
                </form>
                <div class="max-w-[370px] mx-auto">
                    <span>
                        <p class="text-center ">Hoặc đăng nhập với</p>
                    </span>
                    <div class="my-5 text-center text-white">
                        <button class="bg-gray-600 rounded-full p-4 w-1/2 mr-3"><a
                                href="https://www.facebook.com/">Facebook</a></button>
                        <button class="bg-gray-600 rounded-full p-4 w-1/3">Google</button>
                    </div>
                    <hr />
                    <div class="my-5 text-center ">
                        <span class="mr-3">Bạn có điều khoản?</span>
                        <button @click="openModalRegister">
                            <span class="text-emerald-400">Đăng nhập ngay</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Register :show="showRegisterModal" @update:show="showRegisterModal = $event" />
    <SendNewPassword :show="showmodalOTP" @update:show="showmodalOTP = $event" />
</template>

<style>
    .d-login{
        z-index: 999;
    }
</style>