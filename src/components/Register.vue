<script setup>
import store from '@/store';
import { ref } from 'vue';
import VerifyEmail from './Util/VerifyEmail.vue';
import { toast } from "vue3-toastify";
import IconEye from './icons/IconEye.vue';
import IconClockEye from './icons/IconClockEye.vue';

const showModalVerify = ref(false)
const email = ref("")
const password = ref('')
const confirmPasswork = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const firstName = ref('')
const lastName = ref('')
const emailError = ref(false)
const firstNameError = ref(false)
const lastNameError = ref(false)
const passwordError = ref(false)
const confirmError = ref(false)

const showModalEmail = ref(false)

const open = () => {
    showModalEmail.value = true
}
const props = defineProps(['show'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}

const validateform = (password) => {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

const hanldeRegister = async () => {
    if (validateform(password.value)) {
        toast.error('The password requires an uppercase, lowercase, number and special character')
    }
     if (password.value !== confirmPasswork.value || !email.value.trim() ||
        !password.value.trim() || !confirmPasswork.value.trim()) {
        toast.error("This field is required")
    } else {
        try {
            const body = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password:  password.value
            }
            const result = await store.dispatch('registerMember', body)
            if (result.data.data) {
                const res = await store.dispatch('sendMailOTP', email.value)
                if (res && res.data.responseCode === 0) {
                    toast.success(res.data.data)
                    closeModal()
                    showModalVerify.value = true
                }
                toast.success(result.data.data)
            } 
            else { 
                    emailError.value = true
                    passwordError.value = true
                    confirmError.value = true
                    firstNameError.value = true
                    lastNameError.value = true
                    toast.error(result.data.data)
            }    
        } catch (error) {
            console.log(error)
        }
    }   
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

</script>

<template>

    <div v-if="props.show"
        class="fixed d-login inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-2  bg-white rounded-md shadow-xl">
            <div class="w-[450px]">
                <div class="flex">
                    <div class="ml-14 mb-3 text-center">
                        <h1 class="text-2xl font-semibold">Đăng kí tài khoản</h1>
                        <span>Đăng ký để mua và theo dõi quá trình đọc sách</span>
                    </div>
                    <button @click="closeModal"
                        class="flex text-gray-400 cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="hanldeRegister" class="max-w-[370px] mx-auto">
                    <div class="flex gap-2">
                        <input type="text" placeholder="firstName" v-model="firstName"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', firstNameError ? 'border-red-500' : 'border-gray-300']" />
                        <input type="text" placeholder="lastName" v-model="lastName"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', lastNameError ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" v-model="email"
                            :class="['w-full border text-gray-900 text-sm mb-4 rounded-lg p-3.5', emailError ? 'border-red-500' : 'border-gray-300']" />
                    </div>
                    <div class="relative mb-4">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu" v-model="password"
                            :class="['w-full border text-gray-900 text-sm rounded-lg p-3.5', passwordError ? 'border-red-500' : 'border-gray-300']" />
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3 mb-6 cursor-pointer"
                            @click="toggleShowPassword">
                            <IconEye v-if="showPassword" />
                            <IconClockEye v-else />
                        </span>
                        <span class="text-slate-500">Mật khẩu bao gồm 8 ký tự</span>
                    </div>
                    <div class="relative mb-4">
                        <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="Nhập lại mật khẩu"
                            v-model="confirmPasswork"
                            :class="['w-full border  text-gray-900 text-sm rounded-lg p-3.5', confirmError ? 'border-red-500' : 'border-gray-300']" />
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3 mb-6 cursor-pointer"
                            @click="toggleShowConfirmPassword">
                            <IconEye v-if="showConfirmPassword" />
                            <IconClockEye v-else />
                        </span>
                        <span class="text-slate-500">Mật khẩu bao gồm 8 ký tự</span>
                    </div>
                    <div>
                        <button class="bg-emerald-400 w-full font-semibold p-2 rounded-full mb-6">Đăng
                            ký</button>
                    </div>
                </form>
                <div class="max-w-[370px] mx-auto">
                    <span>
                        <p class="text-center ">Hoặc đăng ký với</p>
                    </span>
                    <div class="my-5 text-center text-white">
                        <button class="bg-gray-600 rounded-full p-4 w-1/2 mr-3">
                            <a href="https://www.facebook.com/">Facebook</a></button>
                        <button class="bg-gray-600 rounded-full p-4 w-1/3">Google</button>
                    </div>
                    <hr />
                    <div class="my-5 text-center">
                        <span class="mr-3">Bạn có điều khoản?</span>
                        <button @click="open">
                            <span class="text-emerald-400">Đăng nhập ngay</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <VerifyEmail :show="showModalVerify" :email="email" @update:show="showModalVerify = $event" />
</template>

<style>
    .d-login {
        z-index: 999;
    }
</style>