<template>
  <Modal class="notifications-dialog" title="Notifications" @close-modal="onNotificationsClose">
    <div v-if="!state.notifications.length">
      <Empty label="No notifications to show." />
    </div>
    <div v-else v-for="(notification, index) of state.notifications" :key="index">
      <NotificationsItem :item="notification" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import Modal from '../Modal/Modal.vue';
  import Empty from '../Util/Empty.vue';
  import NotificationsItem from './NotificationsItem.vue';

  const props = defineProps<{
    notifications: [];
  }>();

  const emits = defineEmits<{
    (event: 'action:close'): void;
  }>();

  const state = reactive({
    notifications: computed(() => {
      const nots = props.notifications;
      return nots.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }),
  });

  function onNotificationsClose() {
    emits('action:close');
  }

  defineExpose({ state, onNotificationsClose });
</script>

<style scoped lang="scss">
  .notifications-dialog {
    @apply text-black;
  }
</style>
