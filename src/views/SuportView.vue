<script setup>
import ModalDialog from '@/components/ModalDialog.vue';
import { ref } from 'vue';

const title = ref('')
const content = ref('')

</script>

<template>
    <div class="flex">
        <ModalDialog />
        <div class="w-[400px]">
            <h1 class="text-2xl font-semibold text-emerald-700 pb-4">Gửi yêu cầu</h1>
            <form>
                <div>
                    <label>Nhan đề:</label>
                    <input type="text" placeholder="Nhập thông tin" v-model="title"
                        class="w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5" />
                </div>
                <div>
                    <label>Nội dung yêu cầu:</label>
                    <textarea placeholder="Please enter" v-model="content"
                        class=" w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5"></textarea>
                </div>
                <div>
                    <label>Gửi đến:</label>
                    <select class=" w-full border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg p-3.5">
                        <option>Kỹ thuật viên</option>
                        <option></option>
                    </select>
                </div>
                <div class="flex justify-end mt-5">
                    <button class=" bg-emerald-400 hover:bg-emerald-500 rounded-lg mx-2 p-1">Gửi yêu
                        cầu</button>
                    <button class="border border-emerald-400 hover:bg-emerald-400 rounded-lg px-6 py-1">Hủy</button>
                </div>
            </form>
        </div>
    </div>
</template>
