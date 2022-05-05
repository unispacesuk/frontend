<template>
  <div class="notification-item">
    <div>
      <UserAvatar :user="item.user" size="sm" />
    </div>
    <div class="flex flex-col">
      <div class="text-lg">{{ item.message }}</div>
      <div class="text-sm">{{ moment().endOf('minute').to(item.created_at) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import moment from 'moment';
  import UserAvatar from './UserAvatar.vue';

  const props = defineProps<{
    item: any;
  }>();

  const state = reactive({
    item: computed(() => props.item),
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .notification-item {
    @apply py-3 px-3 cursor-pointer hover:bg-gray-100 rounded-md flex space-x-2;
  }
</style>
