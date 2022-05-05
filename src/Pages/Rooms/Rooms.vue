<template>
  <div class="rooms-page">
    <div class="actions">
      <ButtonActionSecondary @button-click="onFilterMyRooms">
        {{ state.rooms.owned.length ? 'All Rooms' : 'My Rooms' }}
      </ButtonActionSecondary>
      <ButtonActionPrimary @button-click="onCreateRoomClick">Create Room</ButtonActionPrimary>
    </div>

    <template v-if="state.loading">Loading ...</template>

    <template v-else-if="!state.rooms.public.length && !state.rooms.private.length">
      <Empty label="There are no rooms to join and chat." />
    </template>

    <template v-else-if="state.rooms.owned.length">
      <div class="list-title">My Rooms</div>
      <div class="room-list">
        <div v-for="(room, index) of state.rooms.owned" :key="index" class="smooth">
          <router-link :to="{ name: 'room', params: { roomId: room.id } }">
            <RoomItemCard :room="room" />
          </router-link>
        </div>
      </div>
    </template>

    <template v-else>
      <template v-if="state.rooms.admin.length">
        <div class="list-title">Admin Rooms</div>
        <div class="room-list">
          <div v-for="(room, index) of state.rooms.admin" :key="index">
            <router-link :to="{ name: 'room', params: { roomId: room.id } }">
              <RoomItemCard :room="room" />
            </router-link>
          </div>
        </div>
      </template>

      <template v-if="state.rooms.public.length">
        <div class="list-title">Public Rooms</div>
        <div class="room-list">
          <div v-for="(room, index) of state.rooms.public" :key="index">
            <router-link :to="{ name: 'room', params: { roomId: room.id } }">
              <RoomItemCard :room="room" />
            </router-link>
          </div>
        </div>
      </template>

      <template v-if="state.rooms.private.length">
        <div class="list-title">Private Rooms</div>
        <div class="room-list">
          <div v-for="(room, index) of state.rooms.private" :key="index">
            <router-link :to="{ name: 'room', params: { roomId: room.id } }">
              <RoomItemCard :room="room" />
            </router-link>
          </div>
        </div>
      </template>
    </template>
  </div>

  <RoomCreateModal
    v-if="state.isCreatingRoom"
    @action:close="onCreateRoomClose"
    @action:create="onRoomCreate"
  />
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive, nextTick } from 'vue';
  import { getAllRooms } from '../../Services/Rooms/RoomsService';
  import { useUser } from '../../Stores/UserStore';
  import Empty from '../../Components/Util/Empty.vue';
  import RoomItemCard from '../../Components/Rooms/RoomItemCard.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import RoomCreateModal from '../../Components/Rooms/RoomCreateModal.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';

  const state = reactive({
    loading: true,
    rooms: {
      public: [],
      private: [],
      admin: [],
      owned: [],
    },
    isCreatingRoom: false,
  });

  const { currentUser } = useUser();

  onBeforeMount(() => {
    getAllRooms().then((data) => {
      state.rooms.public = data.response.filter(
        (room: any) => room.status === 'public' && room.permission !== 'admin'
      );
      state.rooms.private = data.response.filter((room: any) => room.status === 'private');
      state.rooms.admin = data.response.filter((room: any) => room.permission === 'admin');

      nextTick(() => {
        state.loading = false;
      });
    });
  });

  function onCreateRoomClick() {
    return (state.isCreatingRoom = true);
  }

  function onCreateRoomClose() {
    return (state.isCreatingRoom = false);
  }

  function onFilterMyRooms() {
    if (state.rooms.owned.length) {
      return (state.rooms.owned = []);
    }

    const ownedPrivate = state.rooms.private.filter((room: any) => room.userId === currentUser.id);
    const ownedPublic = state.rooms.public.filter((room: any) => room.userId === currentUser.id);

    state.rooms.owned = [...ownedPrivate, ...ownedPublic];
  }

  function onRoomCreate(data: any) {
    // @ts-ignore
    state.rooms[data.status].push(data);
  }

  defineExpose({ state, onCreateRoomClick, onCreateRoomClose, onFilterMyRooms, onRoomCreate });
</script>

<style scoped lang="scss">
  .rooms-page {
    @apply px-3;

    .actions {
      @apply flex space-x-2 justify-end mb-3;
    }

    .list-title {
      @apply text-xl pl-3 mb-3;
    }

    .room-list {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pb-4 mb-4 border-b border-gray-300;
    }
  }
</style>
