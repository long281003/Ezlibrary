<script setup>
import store from '@/store';
import { onMounted } from 'vue';
import { computed } from 'vue';


const members = computed(() => store.getters.getMember)
onMounted(() => {
    store.dispatch('fetchInfoMember')
})
</script>

<template>
    <div class="flex min-h-screen items-center justify-center">
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-xl">
                <thead>
                    <tr class="bg-blue-gray-100 text-gray-700">
                        <th class="py-3 px-4 text-center">ID</th>
                        <th class="py-3 px-4 text-center">Email</th>
                        <th class="py-3 px-4 text-center">Role</th>
                        <th class="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody class="text-blue-gray-900">
                    <tr class="border-b border-blue-gray-200" >
                        <td class="py-3 px-4">{{ members.id }}</td>
                        <td class="py-3 px-4">{{ members.email }}</td>
                        <td class="py-3 px-4">{{ members.role }}</td>

                        <td class="py-3 px-4">
                            <RouterLink
                                class="text-white bg-yellow-500 hover:bg-yellow-700 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 cursor-pointer">
                                Edit
                            </RouterLink>
                            <button @click="deleteEmployee(employee.id)"
                                class="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 ">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
    
</style>