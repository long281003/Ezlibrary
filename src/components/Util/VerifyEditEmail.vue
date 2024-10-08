<script setup>
import apiMixin from '@/Mixins/MixinAPI';
import store from '@/store';
import { ref, onMounted } from 'vue';
import { toast } from "vue3-toastify";

const otp = ref('')
const props = defineProps(['show', 'email'])
const emit = defineEmits(['update:show'])

const closeModal = () => {
    emit('update:show', false)
}

const handlerSendOTP = async (event) => {
    event.preventDefault()
    try {
        const res = await apiMixin.putWithAuth('/member/editEmail', { email: props.email, otp: otp.value })
        if (res.data && res.data.responseCode === 0) {
            closeModal()
            toast.success('Đổi email thành công')
        }
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    await store.dispatch('fetchInfoMember')
})
</script>

<template>
    <div class="flex justify-center items-center">
        <div v-show="props.show" class="fixed z-50 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
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
                        <h1 class="text-2xl font-semibold">Mã OTP</h1>
                        <span>Nhập mã OTP 6 số</span>
                    </div>
                    <form @submit.prevent="handlerSendOTP" class="max-w-[370px] mx-auto mt-5">
                        <div>
                            <input type="text" placeholder="Mã OTP" v-model="otp"
                                class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                        </div>
                        <div class="flex justify-center gap-4">
                            <div>
                                <button class="bg-emerald-400 w-full font-semibold p-2 rounded-full mb-6">Xác
                                    nhận</button>
                            </div>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
