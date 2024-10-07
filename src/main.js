import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as store from './store'
import "vue3-toastify/dist/index.css";
import Vue3Toastify from 'vue3-toastify';
import apiMixin from './Mixins/MixinAPI'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vue3Toastify, {
  autoClose: 1000,
  position: "top-center"
})
app.use(VueAwesomePaginate)
app.mixin(apiMixin)
app.mount('#app')
