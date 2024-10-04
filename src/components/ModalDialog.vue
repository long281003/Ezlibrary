<script setup>
import { ref, computed, onMounted } from 'vue';
import IconOrder from '../components/icons/IconOrder.vue'
import IconPay from '../components/icons/IconPay.vue'
import store from '@/store';
import Iconexclamation from './icons/Iconexclamation.vue';

const email = ref('')
const firstName = ref('')
const lastName = ref('')

const memberInfor = computed(() => store.getters.getMember)
onMounted(async () => {
    await store.dispatch('fetchInfoMember')
    if (memberInfor.value) {
        email.value = memberInfor.value.email
        firstName.value = memberInfor.value.firstName
        lastName.value = memberInfor.value.lastName
    }
})

</script>

<template>
    <div class="mx-10 border-r-2">
        <div>
            <div class="flex">
                <img src="../assets/avatar1.png" class="w-10" />
                <div class="mx-5">
                    <span>Tài khoản của</span><br />
                    <span class="text-xl">{{ memberInfor.firstName + " " + memberInfor.lastName }}</span>
                </div>
            </div>
            <ul class="mx-2 my-5">
                <li class="my-5">
                    <router-link to="/memberShip" class="flex gap-7">
                        <IconPay />
                        <span>Thông tin thanh toán</span>
                    </router-link>
                </li>
                <li class="my-5">
                    <router-link to="/historyreading" class="flex gap-7">
                        <IconOrder />
                        <span>Lịch sử đọc</span>
                    </router-link>
                </li>
                <li class="my-5">
                    <router-link to="/suportmember" class="flex gap-7">
                        <img src="../assets/headphones.png" width="20" />
                        <span>Yêu cầu hỗ trợ</span>
                    </router-link>
                </li>
                <li class="my-5">
                    <router-link to="/security" class="flex gap-7">
                        <Iconexclamation />
                        <span>Chính sách bảo mật</span>
                    </router-link>
                </li>
                <li class="my-5">
                    <router-link to="/suportuser" class="flex gap-7" >
                        <img src="../assets/Intruction.png" width="20" />
                        <span>Hướng dẫn sử dụng</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
li.active {
    background-color: #c8c8c8;
    color: red;
}

li:hover {
    color: #ff7675;
}
</style>