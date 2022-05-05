<template>
  <div class="pr-3 w-auto">
    <div
      :class="{ active: props.currentTab === 'account' }"
      class="item"
      @click="emits('change-tab', 'account')"
    >
      <UserIcon class="w-5" />
      <div class="hidden dashboard:block">Account Details</div>
    </div>
    <!--    <div-->
    <!--      :class="{ active: props.currentTab === 'settings' }"-->
    <!--      class="item"-->
    <!--      @click="emits('change-tab', 'settings')"-->
    <!--    >-->
    <!--      <CogIcon class="w-5" />-->
    <!--      <div class="hidden dashboard:block">Settings</div>-->
    <!--    </div>-->
    <div
      :class="{ active: props.currentTab === 'notifications' }"
      class="item"
      @click="emits('change-tab', 'notifications')"
    >
      <BellIcon class="w-5" />
      <div class="hidden dashboard:block">Notifications</div>
    </div>
    <div
      :class="{ active: props.currentTab === 'resources' }"
      class="item"
      @click="emits('change-tab', 'resources')"
    >
      <DocumentTextIcon class="w-5" />
      <div class="hidden dashboard:block">Resources</div>
    </div>
    <div
      :class="{ active: props.currentTab === 'read-later' }"
      class="item"
      @click="emits('change-tab', 'read-later')"
    >
      <BookmarkIcon class="w-5" />
      <div class="hidden dashboard:block">Read Later</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    UserIcon,
    BellIcon,
    CogIcon,
    DocumentTextIcon,
    BookmarkIcon,
  } from '@heroicons/vue/solid';

  const props = defineProps<{
    currentTab: string;
  }>();

  const emits = defineEmits<{
    (event: 'change-tab', tab: string): void;
  }>();
</script>

<style scoped lang="scss">
  .item {
    @apply flex items-center space-x-1 py-3 border-b border-gray-200 ease-in-out duration-100;

    &:hover {
      @apply cursor-pointer text-$action-hover;
    }

    &.active {
      @apply text-$action-active;
    }
  }
</style>
