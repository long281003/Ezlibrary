<script setup>
import store from '@/store';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router'

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const address = ref("")
const route = useRoute()
const id = computed(() => route.params.id)
const isEdit = computed(() => id.value != null)

const errors = ref({})

const validate = () => {
    errors.value = {}
    const re = /[A-Z0-9a-z@]/
    if (!firstName.value.trim()) {
        errors.value.firstName = "firstName is required"
    } if (!lastName.value.trim()) {
        errors.value.lastName = "lastName is required"
    } if (!email.value.trim()) {
        errors.value.address = "email is required"
    } if (!re) {
        errors.value.email = "Invalid email format"
    } if (!address.value.trim()) {
        errors.value.address = "address is required"
    }
    return Object.keys(errors.value).length === 0
}

onMounted(async () => {
    if (isEdit.value) {
        const employee = await store.dispatch('fetchEmployeeId', id.value);
        firstName.value = employee.firstName;
        lastName.value = employee.lastName;
        email.value = employee.email;
        address.value = employee.address;
    }
});

const addorUpdateEmployee = async () => {
    if (!validate()) {
        return false;
    }
    const employeeData = {
        id: id.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value
        }
    try {
        if (isEdit.value) {
            await store.dispatch('updateEmploy', { id: id.value, employeeData })
            store.dispatch('fetchEmployee')
        } else {
            await store.dispatch('addEmployee', employeeData)
            store.dispatch('fetchEmployee')
        }
            router.push('/')
        } catch (error) {
            console.log(error)
        }
}

const onSubmit = (e) => {
    e.preventDefault()
    addorUpdateEmployee()
}

</script>

<template>
    <div>
        <form @submit="onSubmit" class="max-w-[750px] mx-auto mt-14">
            <h2 class="text-3xl text-center my-6">{{ isEdit ? "Edit employee" : "Add employee" }}</h2>
            <div class="grid gap-4 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Firstname</label>
                    <input type="text" v-model="firstName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        placeholder="firstName" />
                        <span class="text-red-500">{{ errors.firstName }}</span>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                    <input type="text" id="last_name" v-model="lastName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="lastName" />
                        <span class="text-red-500">{{ errors.lastName }}</span>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" v-model="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="email@gmail.com" />
                        <span>{{ errors.email }}</span>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                    <input type="text" v-model="address"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="address" />
                        <span class="text-red-500">{{ errors.address }}</span>
                </div>
            </div>
            <div>
                <button type="submit"
                    class="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 ">
                    {{ isEdit ? "Update" : "Create" }}
                </button>
            </div>
        </form>
    </div>
</template>

<style>
    
</style>