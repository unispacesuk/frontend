<template>
  <template v-if="state.loading">Loading ...</template>

  <template v-else-if="!state.rooms.length">
    <Empty label="There are no rooms to join and chat." />
  </template>

  <template v-else>
    <div class="room-list">
      <div v-for="(room, index) of state.rooms" :key="index">
        <router-link :to="{ name: 'room', params: { roomId: room.id } }">
          <RoomItemCard :room="room" />
        </router-link>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { getAllRooms } from '../../Services/Rooms/RoomsService';
  import Empty from '../../Components/Util/Empty.vue';
  import RoomItemCard from '../../Components/Rooms/RoomItemCard.vue';

  const state = reactive({
    loading: true,
    rooms: [],
  });

  onBeforeMount(() => {
    getAllRooms().then((data) => {
      state.rooms = data.response;
      state.loading = false;
    });
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .room-list {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5;
  }
</style>
