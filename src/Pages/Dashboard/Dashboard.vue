<template>
  <div class="container">
    <div class="container__top">
      <div class="container__top__left">
        <DashboardLeftMenu />
      </div>
      <div class="container__top__right">
        <AccountDetails />
      </div>
    </div>

    <div class="container__bottom"></div>
  </div>

  <!--  <div>-->
  <!--    <DashboardStarredThreadsList />-->
  <!--  </div>-->
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { IBus } from '../../Interfaces/IBus';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import AccountDetails from '../../Components/Dashboard/DashboardAccountDetails.vue';
  import DashboardLeftMenu from '../../Components/Dashboard/DashboardLeftMenu.vue';

  const $bus = inject<IBus>('$bus');

  const state = reactive({
    isSubmittingProfile: false,
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .container {
    @apply flex flex-col;

    &__top {
      @apply flex;

      &__left {
        @apply w-[150px] flex-shrink-0 border-r mr-2;
      }

      &__right {
        @apply flex-grow px-5 pb-5;
      }
    }

    &__bottom {
      @apply flex justify-end mt-3;
    }
  }
</style>
