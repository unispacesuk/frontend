<template>
  <div class="container">
    <div class="container__top">
      <div class="container__top__left">
        <DashboardLeftMenu :current-tab="state.currentTab" @change-tab="handleTabChange" />
      </div>
      <div class="container__top__right">
        <DashboardAccountDetails v-if="state.currentTab === 'account'" />
        <DashboardNotificationSettings v-if="state.currentTab === 'notifications'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { IBus } from '../../Interfaces/IBus';
  import DashboardAccountDetails from '../../Components/Dashboard/DashboardAccountDetails.vue';
  import DashboardLeftMenu from '../../Components/Dashboard/DashboardLeftMenu.vue';
  import DashboardNotificationSettings from '../../Components/Dashboard/DashboardNotificationSettings.vue';

  const $bus = inject<IBus>('$bus');

  const state = reactive({
    isSubmittingProfile: false,
    currentTab: 'account',
  });

  function handleTabChange(tab: string) {
    state.currentTab = tab;
  }

  defineExpose({ state, handleTabChange });
</script>

<style scoped lang="scss">
  .container {
    @apply flex flex-col;

    &__top {
      @apply flex;

      &__left {
        @apply w-[170px] flex-shrink-0 border-r mr-2;
      }

      &__right {
        @apply flex-grow px-5 pb-5;
      }
    }
  }
</style>
