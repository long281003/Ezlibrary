<script setup>
import { ref } from 'vue';
import CodeQRView from './CodeQRView.vue';
import { onMounted } from 'vue';
import store from '@/store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { axiosMember } from '@/servives/axiosClient';

const router = useRoute()
const showQR = ref(false)
const id = router.params.id

const memberShipIds = computed(() => store.getters.getMemberShipId) 
const memberInfor = computed(() => store.getters.getMember)

const processVNPAYPayment = async () => {
    try {
        const token = sessionStorage.getItem('authtoken')
        if (token) {
            const vnpayUrl = await axiosMember.get(`/transaction/vnpay/submitOrder?membershipId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            if (vnpayUrl) {
                window.location.href = vnpayUrl.data.data;
            }
            return window.location.href
        }
    } catch (error) {   
        console.error('Error processing VNPAY payment:', error);
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// const qrCode = async () => {
//     try {
//         await store.dispatch('fetchQR', memberShipIds.value.id)
//     } catch (error) {
//         console.log(error)
//     }
// }

const openModal = () => {
    showQR.value = true
}

onMounted(async () => {
    await store.dispatch('fetchInfoMember')
    if (id) {
        await store.dispatch('fetchMemberShipId', id)
    }
})

</script>

<template>
    <div class="">
        <div class="text-center text-4xl mb-6">
            <h1>Chọn phương thức thanh toán</h1>
        </div>
        <div class="flex justify-center ">
            <div class="w-[450px] my-3">
                <div class="max-w-[400px] mx-auto">
                    <button @click.prevent="openModal"
                        class="border bg-emerald-400 hover:bg-emerald-500 w-full font-semibold p-2 rounded-lg mb-6">Quét
                        mã
                        QR</button>
                    <button @click.prevent="processVNPAYPayment"
                        class="border bg-emerald-400 hover:bg-emerald-500 w-full font-semibold p-2 rounded-lg mb-6">Thanh
                        toán
                        VNPAY</button>
                </div>
            </div>
            <div class="border border-l-200 my-3"></div>
            <div class="w-[450px] my-3">
                <div class="max-w-[400px] mx-auto text-xl">
                    Họ tên: {{ memberInfor?.firstName + ' ' + memberInfor?.lastName }} <br />
                    Mã người dùng: {{ memberInfor?.memberCode }} <br />
                    Thông tin thanh toán: {{ memberShipIds?.membershipName }} <br />
                    Tạm tính: {{ formatCurrency(memberShipIds?.membershipPrice) }}<br />
                    Mã giảm giá: {{ memberShipIds?.membershipDiscount }}% <br />
                    Tổng thanh toán: {{ formatCurrency(memberShipIds?.membershipPrice) }}<br />
                </div>
                <div class="text-end mt-16">
                    <router-link to="/memberShip"><button
                            class="border w-44 border-emerald-400 hover:bg-emerald-400 rounded-lg px-6 py-1">Hủy</button></router-link>
                </div>
            </div>
        </div>
    </div>
    <CodeQRView :show="showQR" @update:show="showQR = $event" />
</template>