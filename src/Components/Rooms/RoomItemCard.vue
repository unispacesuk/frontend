<template>
  <div class="room-item-shadow smooth-fast">
    <div class="room-item smooth-fast relative">
      <div class="title">{{ state.room.title }}</div>
      <div class="sub-title">{{ roomType() }} room</div>
      <div v-if="state.isOwner" class="owner">you own this room</div>
      <div class="new-message" v-if="state.hasNewMessage">
        <div class="ping"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { useAlertStore } from '../../Stores/AlertsStore';

  const props = defineProps<{
    room: any;
  }>();

  const { currentUser } = useUser();
  const { roomAlerts } = useAlertStore();

  const state: any = reactive({
    room: computed(() => props.room),
    isOwner: props.room.userId === currentUser.id,
    hasNewMessage: computed(
      () => roomAlerts.find((room) => room.roomId === state.room.id)?.hasNewMessage || false
    ),
  });

  function roomType() {
    if (props.room.permission === 'admin') {
      return 'admin only';
    } else if (props.room.permission === 'all' && props.room.status === 'public') {
      return 'public';
    } else if (props.room.status === 'private') {
      return 'private';
    }
  }

  defineExpose({ state, roomType });
</script>

<style scoped lang="scss">
  .room-item {
    @apply w-auto bg-white border border-black rounded-md py-3 px-3 relative z-20 absolute w-full h-full;

    .title {
      @apply whitespace-nowrap overflow-hidden overflow-ellipsis text-lg;
    }

    .sub-title {
      @apply overflow-ellipsis text-sm text-gray-500 italic;
    }

    .owner {
      @apply text-sm italic text-red-500;
    }

    .new-message {
      @apply absolute w-2 h-2 rounded-full bg-red-500 top-1.5 left-1.5;

      .ping {
        @apply w-2 h-2 rounded-full bg-red-500 animate-ping;
      }
    }
  }

  .room-item:hover {
    @apply transform -translate-x-1 -translate-y-1;
  }

  .room-item-shadow {
    @apply relative bg-gray-600 rounded-md z-10 h-[120px];
  }
</style>
