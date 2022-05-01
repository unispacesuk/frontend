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
      <div class="room-page__top">
        <div>
          <div class="title">{{ state.room.title }}</div>
          <div class="sub-title">{{ subTitle() }}</div>
        </div>
        <div class="flex space-x-2" v-if="state.canEdit">
          <ButtonActionSecondary @button-click="onEditClick"> Edit Room </ButtonActionSecondary>
        </div>
      </div>
      <div class="room-info" v-if="state.room.userId === currentUser.id">
        You own this room. You can moderate, invite and remove people.
      </div>

      <div class="chat-container">
        <div class="chat-container__users" v-if="state.users.length">
          <div class="title">User List</div>
          <div v-if="state.usersLoading">Loading Users...</div>
          <div v-else>
            <div class="item" v-for="(user, index) of state.users" :key="index">
              <div class="relative shrink-0">
                <UserAvatar :user="user" size="xs" />
                <div class="status" :class="user.is_online ? 'online' : 'offline'"></div>
              </div>
              <div class="overflow-hidden overflow-ellipsis">
                {{ user.username }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-container__chat">
          <RoomMessagesContainer />

          <div class="flex space-x-2 items-center">
            <Input class="w-full" />
            <ButtonActionSecondary>Send</ButtonActionSecondary>
          </div>
        </div>
      </div>
    </div>

    <!--    <ButtonActionSecondary @button-click="onClickInvite">Invite</ButtonActionSecondary>-->
  </template>

  <RoomEditModal
    :room="state.room"
    v-if="state.isEditing"
    @action:close="onEditClose"
    @action:delete="onDeleteAction"
  />

  <RoomInviteUser v-if="state.isInviting" @action:close="onInviteClose" />
</template>

<script setup lang="ts">
  import { computed, inject, nextTick, onBeforeMount, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUser } from '../../Stores/UserStore';
  import { IBus } from '../../Interfaces/IBus';
  import { deleteRoom, getRoomData, getRoomUsers } from '../../Services/Rooms/RoomsService';
  import Empty from '../../Components/Util/Empty.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import RoomEditModal from '../../Components/Rooms/RoomEditModal.vue';
  import RoomInviteUser from '../../Components/Rooms/RoomInviteUser.vue';
  import UserAvatar from '../../Components/User/UserAvatar.vue';
  import RoomMessagesContainer from '../../Components/Rooms/RoomMessagesContainer.vue';
  import Input from '../../Components/Form/Input.vue';

  const router = useRouter();
  const { roomId } = useRoute().params;
  const $bus = inject<IBus>('$bus');

  const { currentUser } = useUser();

  const state: any = reactive({
    loading: true,
    usersLoading: true,
    room: <any>{},
    users: <any>[],
    error: {
      type: '',
      message: '',
    },
    canEdit: computed(() => state.room.userId === currentUser.id || currentUser.roleId === 1),
    isEditing: false,
    isInviting: false,
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

    getRoomUsers(<string>roomId)
      .then((data) => {
        state.users = data.response;
        state.usersLoading = false;
      })
      .catch(() => {});
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

  function onDeleteAction() {
    deleteRoom(<string>roomId)
      .then(() => {
        $bus?.emit('add-toast', 'Room deleted.', 'success');
        nextTick(() => {
          router.push('/rooms');
        });
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function onEditClick() {
    return (state.isEditing = true);
  }

  function onEditClose() {
    return (state.isEditing = false);
  }

  function onClickInvite() {
    return (state.isInviting = true);
  }

  function onInviteClose() {
    return (state.isInviting = false);
  }

  defineExpose({
    state,
    subTitle,
    onEditClick,
    onEditClose,
    onDeleteAction,
    onClickInvite,
    onInviteClose,
  });
</script>

<style scoped lang="scss">
  .room-page {
    @apply flex flex-col;

    &__top {
      @apply flex items-center justify-between;
    }

    .title {
      @apply text-xl;
    }

    .sub-title {
      @apply text-sm;
    }

    .chat-container {
      @apply flex space-x-2 mt-3 mx-3;

      &__users {
        @apply hidden md:block w-[180px];

        .title {
          @apply font-bold text-lg mb-3;
        }

        .item {
          @apply flex space-x-2 items-center mb-3;
        }

        .status {
          @apply w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white;
        }
        .online {
          @apply bg-green-500;
        }
        .offline {
          @apply bg-red-500;
        }
      }

      &__chat {
        @apply w-full;
      }
    }
  }
</style>
