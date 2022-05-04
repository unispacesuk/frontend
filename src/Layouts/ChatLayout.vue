<template>
  <div class="chat-layout">
    <div class="left-drawer smooth" :class="state.mobileNav ? 'left-0' : '-left-[300px]'">
      <LeftNav :user="user" />
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../Stores/UserStore';
  import LeftNav from '../Components/Nav/LeftNav.vue';

  const { currentUser } = useUser();
  const { user } = storeToRefs(useUser());

  const state = reactive({
    mobileNav: false,
  });

  addEventListener('left-drawer', (e) => {
    handleMobileNav();
  });

  const handleMobileNav = () => {
    state.mobileNav = !state.mobileNav;
  };

  defineExpose({ state, user });
</script>

<style scoped lang="scss">
  .chat-layout {
    .left-drawer {
      @apply min-w-[300px] lg:min-w-[220px] lg:left-0 h-screen bg-slate-800 text-white fixed overflow-auto z-[90];
    }

    .main-content {
      @apply bg-white w-auto lg:ml-[220px] h-screen;
    }
  }
</style>
