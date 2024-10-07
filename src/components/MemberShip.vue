<script setup>
import store from '@/store';
import { ref, onMounted, watch } from 'vue';
import { computed } from 'vue';
import SpinnerLoading from '@/componentsHTMl/SpinnerLoading.vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';

const memberShips = computed(() => store.getters.getMemberShip)
const memberMemberShip = computed(() => store.state.memberMemberShip)

const transactions = ref([])
const page = ref(0)
const size = ref(5)        
const totalPage = ref(1)
const currentPage = computed(() => page.value + 1)
const isLoading = ref(false)

onMounted( async () => {
    isLoading.value = true
    setTimeout(async () => {
        await store.dispatch('fetchMemberMemberShip')
        await store.dispatch('fetchMemberShip')
        isLoading.value = false
    }, 1000)
    
   await fetchTransaction()
})

const fetchTransaction = async () => {
    await store.dispatch('fetchTransaction', { page: page.value, size: size.value })
}

const alltransactions = computed(() => store.getters.getTransaction)
watch(alltransactions, (newTransaction) => {
    transactions.value = newTransaction.data
    totalPage.value = newTransaction.totalPages
})

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const prePage = async () => {
    if (page.value > 0) {
        page.value--;
         fetchTransaction()
    }
}

const nextPage = async () => {
    if (page.value < totalPage.value - 1 ) {
        page.value++;
         fetchTransaction()
    }
}
const handleClick = (targetPage) => {
    if (targetPage < currentPage.value && targetPage >= 1) { // Going back
        page.value = targetPage - 1;
        prePage();
    } else if (targetPage > currentPage.value && targetPage <= totalPage.value) { // Going forward
        page.value = targetPage - 1;
        nextPage();
    }
}
</script>

<template>
    <div class="mx-auto px-24">
        <div class="">
            <div class="mb-5">
                <h1 class="text-3xl font-semibold"><i>Gói hội viên</i></h1>
                <span class="mx-20">Hạng hội viên đăng ký cho người dùng</span>
            </div>
            <div class="text-center " v-if="isLoading">
                <SpinnerLoading />
            </div>
            <div v-if="!isLoading" class=" grid mx-20 gap-10 xl:grid-cols-3 md:grid-cols-2">
                <router-link v-for="memberShip of memberShips.reverse()" :key="memberShip.id"
                    :to="{name: 'payment', params: {id: memberShip.id}}" :class="['w-[250px] transform  hover:scale-125 cursor-pointer border rounded-3xl p-2 shadow transition ease-in-out duration-700',
                     memberMemberShip.id === memberShip.id ? 'bg-white' : 'bg-green-500'   
                    ]">
                    <p class="text-center">{{ memberShip.membershipName }}</p>
                    <hr class="my-1" />
                    <p class="text-center">{{ formatCurrency(memberShip.membershipPrice) }}</p>
                    <ul v-for="(descriptionMb, index) of memberShip.description.split('.').filter(item => item.trim() !== '')"
                        :key="index" class="p-1">
                        <li>- {{ descriptionMb }}</li>
                    </ul>
                </router-link>
            </div>
        </div>
        <div class="mx-auto pt-20">
            <h1 class="font-bold text-2xl mb-4"><i>Danh sách thanh toán</i></h1>
            <div class="bg-white p-10">
                <table class="min-w-full border-collapse shadow-md ">
                    <thead>
                        <tr>
                            <th class="border border-slate-300 ">STT</th>
                            <th class="border border-slate-300 ">Mã Thanh toán</th>
                            <th class="border border-slate-300 ">Ngày đăng ký</th>
                            <th class="border border-slate-300 ">Số tiền thanh toán</th>
                            <th class="border border-slate-300 ">Mô tả</th>
                            <th class="border border-slate-300 ">Phương thức thanh toán</th>
                            <th class="border border-slate-300 ">Trạng thái giao dịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transaction, index) of alltransactions" :key="transaction.id">
                            <td class="border border-slate-300 text-center">{{ index + 1 }}</td>
                            <td class="border border-slate-300 text-center">{{ transaction.transactionCode }}</td>
                            <td class="border border-slate-300 text-center">{{ new Date(transaction.date).toLocaleDateString('vi-VN') }}</td>
                            <td class="border border-slate-300 text-center">{{ formatCurrency(transaction.amount) }}</td>
                            <td class="border border-slate-300 text-center">{{ transaction.description }}</td>
                            <td class="border border-slate-300 text-center">{{ transaction.type }}</td>
                            <td class="border border-slate-300 text-center">{{ transaction.status }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex mt-10 justify-center">
                    <VueAwesomePaginate :total-items="totalPage * size" :items-per-page="size" :max-pages-shown="3"
                        v-model="currentPage" @click="handleClick" />
                    <!-- <div class="flex">
                        <button @click="prePage" :disabled="page === 0"
                            class="flex items-center justify-center px-4 h-10  text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                            <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                            </svg>
                            Previous
                        </button>
                        <span class="mx-3 mt-1">{{ currentPage }} / {{ totalPage }}</span>
                        <button @click="nextPage" :disabled="page >= totalPage - 1"
                            class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
