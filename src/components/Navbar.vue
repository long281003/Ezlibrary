<script setup>
import store from "@/store";
import { ref } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";
import Login from "@/components/Login.vue";
import Register from "./Register.vue";
import router from "@/router";
import IconHome from "./icons/IconHome.vue";

const members = computed(() => store.getters.getMember);
const tags = computed(() => store.getters.getTag)
const token = sessionStorage.getItem("authtoken");
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const openModalLogin = () => {
  showLoginModal.value = true;
  showRegisterModal.value = false;
};

const openModalRegister = () => {
  showRegisterModal.value = true;
  showLoginModal.value = false;
};

const logOut = () => {
  sessionStorage.removeItem("authtoken");
  router.go(0);
};
onMounted(async () => {
  await store.dispatch("fetchInfoMember");
  await store.dispatch('fetchTag')
});
</script>

<template>
  <div class="grid min-h-[140px] w-full start-0">
    <div class="max-h-[768px]">
      <nav
        class="fixed top-0 z-10 block w-full px-4 py-2 bg-white border rounded-none shadow-md border-white/80 lg:px-8 lg:py-4">
        <div class="flex items-center justify-between text-blue-gray-900">
          <router-link to="/home" class="mx-6 block cursor-pointer py-1.5 font-sans text-base font-medium text-inherit">
            <IconHome />
          </router-link>
          <div class="flex">
            <div class="flex items-center gap-4 mx-8">
              <div class="hidden lg:inline-block">
                <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <router-link to="/" class="flex items-center text-lg">Giới thiệu</router-link>
                  </li>
                  <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <div className="flex relative ">
                      <div className="group relative">
                        <router-link class="flex items-center text-lg">
                          Chủ đề
                        </router-link>
                        <div
                          className="hidden group-hover:block absolute w-[600px] z-20 font-normal bg-white rounded-lg shadow">
                          <ul className="p-2 text-base grid grid-cols-4 gap-5">
                            <li v-for="tag of tags" :key="tag.id" >
                              <router-link :to="{ name: 'booktag', params: {id: tag.id} }"
                                className="block py-2 no-underline text-stone-500 hover:text-red-600 ">{{ tag.name
                                }}</router-link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <div className="flex relative ">
                      <div className="group relative">
                        <router-link class="flex items-center text-lg">
                          Hỗ trợ
                        </router-link>
                        <div
                          className="hidden group-hover:block absolute w-44 z-20 font-normal bg-white rounded-lg shadow">
                          <ul className="p-3 text-base ">
                            <li>
                              <router-link :to="{ name: 'security' }"
                                className="block py-2 no-underline text-stone-500 hover:text-red-600 ">Chính sách bảo
                                mật</router-link>
                            </li>
                            <li>
                              <router-link :to="{ name: 'suportuser' }"
                                className="block py-2 no-underline text-stone-500 hover:text-red-600 ">Hướng dẫn sử
                                dụng</router-link>
                            </li>
                            <li>
                              <router-link :to="{ name: 'suportmember' }"
                                className="block py-2 no-underline text-stone-500 hover:text-red-600 ">Gửi yêu cầu-Hỗ
                                trợ</router-link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div v-if="token" className="flex relative ">
              <div className="hidden group relative lg:inline-block">
                <div className="cursor-pointer">
                  <span className="mx-1 text-xl font-semibold mb-4">Hi {{ members.firstName }}!</span>
                </div>
                <div
                  className="hidden group-hover:block absolute right-0 w-44 z-10 font-normal bg-white rounded-lg shadow">
                  <ul className="p-3 text-base ">
                    <li>
                      <router-link :to="{ name: 'editmember' }"
                        className="block py-2 no-underline text-stone-500 hover:text-red-600 ">Thông tin tài
                        khoản</router-link>
                    </li>
                    <li>
                      <router-link :to="{ name: 'historyreading' }"
                        className="block py-2 no-underline text-stone-500 hover:text-red-600 ">Lịch sử đọc</router-link>
                    </li>
                    <li>
                      <router-link to="/memberShip" class="block py-2 no-underline text-stone-500 hover:text-red-600">
                        Dịch vụ
                      </router-link>
                    </li>
                    <li>
                      <a href="#" @click.prevent="logOut"
                        className="block py-2 no-underline text-stone-500 hover:text-red-600 ">Đăng xuất</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else class="flex items-center gap-x-1">
              <button @click="openModalLogin"
                class="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button">
                Đăng nhập
              </button>
              <button @click="openModalRegister"
                class="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button">
                Đăng ký
              </button>
            </div>
          </div>
          <button
            class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </div>
  </div>
  <Login :show="showLoginModal" @update:show="showLoginModal = $event" />
  <Register :show="showRegisterModal" @update:show="showRegisterModal = $event" />
</template>
