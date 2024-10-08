<script setup>
import store from '@/store';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import SendEmailOTP from '@/views/SendEmailOTP.vue';
import ModalDialog from './ModalDialog.vue';
import iconEdit from '../components/icons/iconEdit.vue'
import { toast } from "vue3-toastify";
import router from '@/router';
import ChangePassword from './Util/ChangePassword.vue';
import apiMixin from '@/Mixins/MixinAPI';

const firstName = ref('')
const lastName = ref('')
const address = ref('')
const birthDate = ref(new Date())
const email = ref('')
const phoneNumber = ref('')
const showEmailModal = ref(false)
const showPassword = ref(false)

const memberInfor = computed(() => store.getters.getMember)
const memberMemberShip = computed(() => store.state.memberMemberShip)

onMounted(async () => {
    await store.dispatch('fetchInfoMember')
    if (memberInfor.value) {
        const date = new Date(memberInfor.value.birthDate)
        const formattedDate = date.toISOString().substring(0, 10);
        firstName.value = memberInfor.value.firstName,
        lastName.value = memberInfor.value.lastName,
        address.value = memberInfor.value.address, 
        birthDate.value = formattedDate,
        email.value = memberInfor.value.email,
        phoneNumber.value = memberInfor.value.phoneNumber
    }
    await store.dispatch('fetchMemberMemberShip')
    
})

const editAccount = async () => {
    try {
        const dateOfBirth = new Date(birthDate.value);
        const info = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            birthDate: dateOfBirth,
            email: email.value,
            phoneNumber: phoneNumber.value
        }
        await store.dispatch('editInfo', info)
        toast.success('Lưu thay đổi thành công')
    } catch (error) {
        console.log(error)
    }
}

const handleInactive = async () => {
    const useConfirm = confirm("Bạn có muốn vô hiệu hóa tài khoản")
    if (useConfirm) {
        const res = await apiMixin.putWithAuth('/member/inactive')
        if (res) {
            sessionStorage.removeItem('authtoken')
            toast.success('Tài khoản đã bị vô hiệu hóa')
            router.go(0);
        }
    } else {
        toast.info("Tài khoản không bị vô hiệu hóa")
    }
}

const handleChangePassword = () => {
    showPassword.value = true
}

const openEmailModal = () => {
    showEmailModal.value = true
}

const handleRouter = () => {
    router.push('/memberShip')
}
</script>

<template>
    <div class="flex">
        <div>
            <div>
                <ModalDialog />
            </div>
        </div>
        <div class="">
            <h1 class="text-center text-2xl mb-3">Thông tin tài khoản</h1>
            <div class="flex justify-end mr-14">
                <div class="flex bg-slate-100">
                    <div class="w-[570px] my-3">
                        <div class="mb-6 ml-12">
                            <h3 class="text-2xl text-gray-500">thông tin cá nhân</h3>
                        </div>
                        <form @submit.prevent="editAccount" class="max-w-[470px] mx-auto mt-5">
                            <div class="flex">
                                <div
                                    class=" flex justify-center items-center mr-8 rounded-full bg-blue-100 border-blue-300 border-4 w-36 h-28">
                                    <div>
                                        <img src="../assets/avatar.png" class="w-10" />
                                    </div>
                                </div>
                                <div class="w-[440px]">
                                    <div class="flex items-center">
                                        <label class="mr-10">Họ</label>
                                        <input type="text" placeholder="firstName" v-model="firstName"
                                            class=" w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                                    </div>
                                    <div class="flex items-center">
                                        <label class="mr-10">Tên</label>
                                        <input type="text" placeholder="lastName" v-model="lastName"
                                            class=" w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <label class="mr-3">Ngày sinh</label>
                                <input type="date" v-model="birthDate"
                                    class="w-96 border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                            </div>
                            <div class="flex justify-between items-center">
                                <label>Địa chỉ</label>
                                <input type="text" placeholder="Address" v-model="address"
                                    class="w-96 border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                            </div>
                            <div class="flex justify-between">
                                <label>Số điện thoại</label>
                                <input type="text" placeholder="Address" v-model="phoneNumber"
                                    class="w-96 border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                            </div>
                            <div class="flex mb-5">
                                <label>Loại thẻ</label>
                                <p class=" text-gray-900 text-md ml-10 ">
                                    {{ memberMemberShip.membershipName }}</p>
                                <iconEdit class="mx-5 my-1 cursor-pointer" @click="handleRouter" />
                            </div>
                            <!-- <div class="flex mb-5">
                                <label>Ngày đăng ký</label>
                                <p class=" text-gray-900 text-md ml-10 ">
                                    {{ memberInfor.membershipStartDate }}</p>
                            </div>
                            <div class="flex mb-5">
                                <label>Ngày hết hạn</label>
                                <p class=" text-gray-900 text-md ml-10 ">
                                    {{ memberInfor.membershipEndDate }}</p>
                            </div> -->
                            <div>
                                <button class="bg-emerald-400 w-full font-semibold p-2 rounded-full mb-6">Lưu thay
                                    đổi</button>
                            </div>
                        </form>
                    </div>
                    <div class="border border-l-200 my-3"></div>
                    <div class="w-[450px] my-3">
                        <div>
                            <div>
                                <div class="mb-6">
                                    <h1 class="text-2xl text-gray-500 ml-5">Email và bảo mật</h1>
                                </div>
                                <div >
                                    <div class="flex justify-between mx-4">
                                        <div class="flex">
                                            <img src="../assets/email.png" class="w-7 h-7 mr-2" />
                                            <div class="flex flex-col">
                                                <span>Địa chỉ email</span>
                                                <span>{{ email }}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button @click="openEmailModal"
                                                class="border border-blue-400 cursor-pointer rounded-md p-2 mt-2 text-blue-400">Cập
                                                nhập</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8">
                                <div class="flex justify-between mx-4">
                                    <div class="flex">
                                        <img src="../assets/lock.png" class="w-7 h-7 mr-2" />
                                        <div class="flex flex-col">
                                            <button>Thiết lập mật khẩu</button>
                                        </div>
                                    </div>
                                    <div>
                                        <button @click="handleChangePassword"
                                            class="border border-blue-400 cursor-pointer rounded-md p-2  text-blue-400">Cập
                                            nhập</button>
                                    </div>
                                </div>
                                <div class="mt-8">
                                    <div class="flex justify-between mx-4">
                                        <div class="flex">
                                            <img src="../assets/trash.svg" class="w-6 h-6 mr-2" />
                                            <div class="flex flex-col">
                                                <span>Yêu cầu vô hiệu hóa tài khoản</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button @click="handleInactive"
                                                class="border border-blue-400 cursor-pointer rounded-md p-2 text-blue-400">Yêu
                                                cầu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8">
                                <div class="mb-6">
                                    <h1 class="text-2xl text-gray-500 ml-5">Liên kết mạng xã hội</h1>
                                </div>
                                <div class="flex justify-between mx-4">
                                    <div class="flex">
                                        <img src="../assets/facebook.png" class="w-7 h-7 mr-2" />
                                        <div class="flex flex-col">
                                            <span>Facebook</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            class="border border-blue-400 cursor-pointer rounded-md p-2  text-blue-400">liên
                                            kết</button>
                                    </div>
                                </div>
                                <div class="mt-10">
                                    <div class="flex justify-between mx-4">
                                        <div class="flex">
                                            <img src="../assets/google.png" class="w-7 h-7 mr-2" />
                                            <div class="flex flex-col">
                                                <span>Google</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                class="border border-blue-400 cursor-pointer rounded-md p-2 text-blue-400">liên
                                                kết</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ChangePassword :show="showPassword" @update:show="showPassword = $event" />
    <SendEmailOTP :show="showEmailModal" @update:show="showEmailModal = $event" />
</template>