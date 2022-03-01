<template>
  <div class="w-full h-screen flex">
    <div
      class="min-w-[300px] -left-[300px] lg:min-w-[220px] lg:left-0 h-screen bg-slate-800 text-white fixed overflow-auto smooth z-[90]"
      :class="{ '-left-0': mobileNav }"
    >
      <LeftNav :user="user" />
    </div>
    <div
      class="w-full lg:ml-[220px] px-10 pb-10 pt-3 space-y-3 smooth flex flex-col justify-between"
    >
      <div>
        <div :class="{ '-ml-5': mobileNav }">
          <button
            @click="handleMobileNav"
            class="lg:hidden smooth outline-none"
            :class="{ 'ml-[300px]': mobileNav }"
          >
            <MenuIcon v-if="!mobileNav" class="w-7" />
            <XIcon v-if="mobileNav" class="w-7" />
          </button>
        </div>
        <div class="w-full bg-white p-3 rounded-md shadow-sm">
          <slot></slot>
        </div>
      </div>
      <div>
        <div class="w-full bg-white">this is the footer ok...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import LeftNav from '../Components/Nav/LeftNav.vue';
  import Toasts from '../Components/Toast/Toasts.vue';
  import { useUser } from '../Stores/UserStore';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { MenuIcon, XIcon } from '@heroicons/vue/solid';

  export default {
    name: 'Layout',
    components: { MenuIcon, XIcon, Toasts, LeftNav },
    setup() {
      const userStore = useUser();
      const { user } = storeToRefs(userStore);

      const currentUser = userStore.currentUser;

      const mobileNav = ref<boolean>(false);
      const handleMobileNav = () => {
        mobileNav.value = !mobileNav.value;
      };

      addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.value) {
          mobileNav.value = false;
        }
      });

      return {
        user,
        currentUser,
        mobileNav,
        handleMobileNav,
      };
    },
  };
</script>
