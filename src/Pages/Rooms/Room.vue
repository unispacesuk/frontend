<template>
  <template v-if="state.loading"> Loading... </template>

  <template v-else-if="!roomId">
    <Empty label="This is an invalid room id." />
  </template>

  <template v-else-if="!state.room">
    <Empty label="No room was found with that id." />
  </template>

  <template v-else-if="state.error.type === 'no-permission'">
    <div>{{ state.error.message }}</div>
  </template>

  <template v-else>
    <div class="room-page">
      <div class="title">{{ state.room.title }}</div>
      <div class="sub-title">{{ subTitle() }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { IBus } from '../../Interfaces/IBus';
  import { getRoomData } from '../../Services/Rooms/RoomsService';
  import Empty from '../../Components/Util/Empty.vue';

  const { roomId } = useRoute().params;
  const $bus = inject<IBus>('$bus');

  const state = reactive({
    loading: true,
    room: <any>{},
    error: {
      type: '',
      message: '',
    },
  });

  onBeforeMount(() => {
    getRoomData(<string>roomId)
      .then((data) => {
        state.room = data.response;
        state.loading = false;
      })
      .catch((error) => {
        state.loading = false;
        if (error.response && error.response.data.type === 'no-permission') {
          state.error.type = error.response.data.type;
          state.error.message = error.response.data.error;
        }
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  });

  function subTitle() {
    if (state.room.permission === 'admin') {
      return 'This is an Admin only room.';
    } else if (state.room.permission === 'all' && state.room.status === 'public') {
      return 'This is a public room. Everyone can chat.';
    } else if (state.room.status === 'private') {
      return 'This is a private room. Only invited users can chat.';
    }
  }

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .room-page {
    .title {
      @apply text-xl;
    }

    .sub-title {
      @apply text-sm;
    }
  }
</style>
