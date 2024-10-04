<script setup>
import { axiosMember } from '@/servives/axiosClient';
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import IconEye from '../icons/IconEye.vue';
import IconClockEye from '../icons/IconClockEye.vue';
import apiMixin from '@/Mixins/MixinAPI';

const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const props = defineProps(['show', 'email'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSubmit = async () => {
    try {
        if (!newPassword.value.trim() || !confirmPassword.value.trim() || newPassword.value !== confirmPassword.value) {
            toast.error('Invalid password')
        } else {
            const body = {
                email: props.email,
                newPassword: newPassword.value,
                confirmPassword: confirmPassword.value
            }
            // await store.dispatch('fogotpassword', body)
            const res = await apiMixin.postWithoutAuth('/auth/member/forgot-password', body)
            if (res && res.responseCode === 0) {
                toast.success("Đổi mật khẩu thành công")
            }
            closeModal()
        }
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="flex justify-center items-center">
        <div v-show="props.show" class="fixed z-50 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="relative max-w-2xl bg-white rounded-md shadow-xl ">
                <div class="w-[450px]">
                    <div class="flex ">
                        <div class="ml-5 mt-2 text-center">
                            <h1 class="text-2xl font-semibold">Tạo mật khẩu mới</h1>
                            <span>Mật khẩu dài từ 8 đến 32 kí tự, bao gồm số, chữ hoa, chữ thường và kí tự đặc
                                biệt</span>
                        </div>
                        <button @click="closeModal"
                            class="flex mt-1 mr-1 text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <form @submit.prevent="handleSubmit" class="max-w-[370px] mx-auto mt-5">
                        <div class="relative ">
                            <label>Mật khẩu mới</label>
                            <input :type="showPassword ? 'text' : 'password'" placeholder="password"
                                v-model="newPassword"
                                class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                            <span class="absolute inset-y-0 right-0 top-2 flex items-center pr-3 cursor-pointer"
                                @click="toggleShowPassword">
                                <IconEye v-if="showPassword" />
                                <IconClockEye v-else />
                            </span>
                        </div>
                        <div class="relative">
                            <label>Nhập lại mật khẩu</label>
                            <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="confirmPassword"
                                v-model="confirmPassword"
                                class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                            <span class="absolute inset-y-0 right-0 top-2 flex items-center pr-3 cursor-pointer"
                                @click="toggleShowConfirmPassword">
                                <IconEye v-if="showConfirmPassword" />
                                <IconClockEye v-else />
                            </span>
                        </div>
                        <div>
                            <button class="bg-emerald-400 w-full font-semibold p-2 rounded-full mb-6">Xác nhận</button>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
