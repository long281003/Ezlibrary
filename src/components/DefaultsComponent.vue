<script setup>
import FooterView from '@/componentsHTMl/FooterView.vue';
import Navbar from './Navbar.vue';

</script>

<template>
    <Navbar />
    <div class="max-w-[1400px] mx-auto pb-10">
        <router-view />
    </div>
    <FooterView/>
</template>