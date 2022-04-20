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
  import { computed, inject, reactive } from 'vue';
  import { DashboardTab } from '../../Util/Types';
  import { IBus } from '../../Interfaces/IBus';
  import DashboardAccountDetails from '../../Components/Dashboard/DashboardAccountDetails.vue';
  import DashboardLeftMenu from '../../Components/Dashboard/DashboardLeftMenu.vue';
  import DashboardNotificationSettings from '../../Components/Dashboard/DashboardNotificationSettings.vue';

  const $bus = inject<IBus>('$bus');

  const tabNames: DashboardTab[] = ['account', 'notifications'];
  const currentTab = computed(() => {
    if (localStorage.getItem('dashboard-tab')) {
      if (tabNames.includes(<'account' | 'notifications'>localStorage.getItem('dashboard-tab'))) {
        return localStorage.getItem('dashboard-tab');
      }
    }

    localStorage.setItem('dashboard-tab', 'account');
    return 'account';
  });

  const state = reactive({
    isSubmittingProfile: false,
    currentTab: currentTab.value,
  });

  function handleTabChange(tab: string) {
    state.currentTab = <DashboardTab>tab;
    localStorage.setItem('dashboard-tab', tab);
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
