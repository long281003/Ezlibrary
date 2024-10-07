<script setup>
import { computed } from 'vue';
import store from '@/store'
import { onMounted } from 'vue';

const employees = computed(() => store.getters.getEmployee)

onMounted(() => {
    store.dispatch('fetchEmployee')
})

const deleteEmployee = async (id) => {
    const iscomfirm = confirm("Bạn có muốn xóa employee này không")
    if (iscomfirm) {
        try {
            await store.dispatch('deleteEmployee', id)
            store.dispatch('fetchEmployee')
        } catch (error) {
            console.log(error)
            alert('Xóa thất bại')
        }
    }
}

</script>

<template>

    <div class="flex min-h-screen items-center justify-center">
        <div class="overflow-x-auto">
            <div class=" flex justify-end">
                <RouterLink to="/about"
                    class="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mx-2">
                    Create Employee
                </RouterLink>
            </div>
            <table class="min-w-full bg-white shadow-md rounded-xl">
                <thead>
                    <tr class="bg-blue-gray-100 text-gray-700">
                        <th class="py-3 px-4 text-center">ID</th>
                        <th class="py-3 px-4 text-center">FirstName</th>
                        <th class="py-3 px-4 text-center">LastName</th>
                        <th class="py-3 px-4 text-center">Email</th>
                        <th class="py-3 px-4 text-center">address</th>
                        <th class="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody class="text-blue-gray-900">
                    <tr class="border-b border-blue-gray-200" :key="employee.id" v-for="employee in employees">
                        <td class="py-3 px-4">{{ employee.id }}</td>
                        <td class="py-3 px-4">{{ employee.firstName }}</td>
                        <td class="py-3 px-4">{{ employee.lastName }}</td>
                        <td class="py-3 px-4">{{ employee.email }}</td>
                        <td class="py-3 px-4">{{ employee.address }}</td>
                        <td class="py-3 px-4">
                            <RouterLink :to="{ path: `/employee/update/${employee.id}` }"
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

<style></style>