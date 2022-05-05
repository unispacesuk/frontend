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
        <div class="flex items-center space-x-3">
          <div
            class="lg:hidden cursor-pointer"
            :class="state.mobileNav ? 'ml-[300px]' : 'ml-0'"
            @click="onHamburgerClick"
          >
            <MenuIcon v-if="!state.mobileNav" class="w-7" />
            <XIcon v-if="state.mobileNav" class="w-7" />
          </div>
          <div class="flex-shrink-0 overflow-hidden overflow-ellipsis">
            <div class="title">{{ state.room.title }}</div>
            <div class="sub-title">{{ subTitle() }}</div>
          </div>
        </div>
        <div class="flex space-x-2 flex-shrink-0" v-if="state.canEdit && !state.mobileNav">
          <ButtonActionSecondary
            @button-click="onClickInvite"
            v-if="state.room.status === 'private'"
          >
            Invite
          </ButtonActionSecondary>
          <ButtonActionSecondary @button-click="onEditClick"> Edit Room </ButtonActionSecondary>
        </div>
      </div>
      <div class="room-info" v-if="state.room.userId === currentUser.id">
        You own this room. You can moderate, invite and remove people.
      </div>

      <div class="chat-container">
        <div class="chat-container__users" v-if="state.room.status === 'private'">
          <div class="title">User List</div>
          <div v-if="state.usersLoading">Loading Users...</div>
          <div v-else>
            <RoomUsersList :users="state.users" @action:remove-user="onRemoveUserAction" />
          </div>
        </div>
        <div class="chat-container__right">
          <div class="chat" ref="messagesArea">
            <div v-if="state.loadingMessages">Loading messages...</div>
            <div v-else>
              <RoomMessagesContainer :messages="state.messages" :users="state.users" />
            </div>
          </div>
          <div class="message-box">
            <input
              :value="state.newMessage"
              class="flex flex-grow outline-none resize-none"
              placeholder="Message"
              @keyup="onMessageInputChange"
              rows="2"
            />
            <ButtonActionSecondary @button-click="onMessageClickSend">Send</ButtonActionSecondary>
          </div>
        </div>
      </div>
    </div>
  </template>

  <RoomEditModal
    :room="state.room"
    v-if="state.isEditing"
    @action:close="onEditClose"
    @action:delete="onDeleteAction"
    @action:update="onUpdateAction"
  />

  <RoomInviteUser v-if="state.isInviting" @action:close="onInviteClose" />
</template>

<script setup lang="ts">
  import { computed, inject, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUser } from '../../Stores/UserStore';
  import { useAlertStore } from '../../Stores/AlertsStore';
  import { IBus } from '../../Interfaces/IBus';
  import {
    deleteRoom,
    getRoomData,
    getRoomUsers,
    removeUser,
    postMessage,
    getRoomMessages,
  } from '../../Services/Rooms/RoomsService';
  import { MenuIcon, XIcon } from '@heroicons/vue/solid';
  import Empty from '../../Components/Util/Empty.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import RoomEditModal from '../../Components/Rooms/RoomEditModal.vue';
  import RoomInviteUser from '../../Components/Rooms/RoomInviteUser.vue';
  import RoomMessagesContainer from '../../Components/Rooms/RoomMessagesContainer.vue';
  import RoomUsersList from '../../Components/Rooms/RoomUsersList.vue';

  const router = useRouter();
  const { roomId } = useRoute().params;
  const $bus = inject<IBus>('$bus');

  const { currentUser, connection } = useUser();
  const { roomAlerts } = useAlertStore();

  const state: any = reactive({
    loading: true,
    usersLoading: true,
    room: <any>null,
    users: <any>[],
    messages: <any>[],
    error: {
      type: '',
      message: '',
    },
    canEdit: computed(() => state.room.userId === currentUser.id || currentUser.roleId === 1),
    isEditing: false,
    isInviting: false,
    newMessage: '',
    roomAlert: roomAlerts.find((room) => room.roomId === roomId) || null,
    mobileNav: false,
    loadingMessages: true,
  });

  const messagesArea = ref<Element>();

  onBeforeMount(() => {
    getRoomData(<string>roomId)
      .then((data) => {
        state.room = data.response;
        state.loading = false;

        // after loading everything from the room mark it as read on the nav/roomAlerts
        if (state.roomAlert) {
          state.roomAlert.hasNewMessage = false;
        }

        nextTick(() => {
          if (state.room && state.room.status === 'private') {
            handleGetRoomUsers();
          }
        });
      })
      .catch((error) => {
        state.loading = false;
        if (error.response && error.response.data.type === 'no-permission') {
          state.error.type = error.response.data.type;
          state.error.message = error.response.data.error;
        }
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });

    getRoomMessages(<string>roomId)
      .then((data) => {
        state.messages = data.response.sort(
          (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        state.loadingMessages = false;
        scrollToBottom();
      })
      .catch(() => {});

    document.addEventListener('new-room-message', (event: any) => {
      const data = event.detail;

      if (data.metadata.room_id === roomId) {
        state.messages.push(data.metadata);
      }
      scrollToBottom();
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

  function onMessageInputChange(e: any) {
    if (e.key === 'Enter') {
      return onMessageClickSend();
    }

    return (state.newMessage = e.target.value);
  }

  function onMessageClickSend() {
    if (!state.newMessage.trim()) return;

    sendChatRoomMessage();
    state.newMessage = '';
    scrollToBottom();
  }

  function onRemoveUserAction({ _id }: any) {
    if (!roomId || !_id) return;

    removeUser(<string>roomId, _id)
      .then(() => {
        console.log(state.users);
        state.users = state.users.filter((user: any) => user._id !== _id);
        console.log(state.users);
      })
      .catch(() => $bus?.emit('add-toast', 'Something went wrong.', 'error'));
  }

  function sendChatRoomMessage() {
    const realTime = connection.websocket;
    const metadata = {
      room_id: roomId,
      sender: {
        _id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        is_online: true,
      },
      message: state.newMessage,
      created_at: new Date(),
    };
    const payload = {
      type: 'room-message',
      metadata: metadata,
    };
    realTime!.websocket.send(JSON.stringify(payload));
    // state.messages.push(metadata);

    postMessage(metadata)
      .then(() => {})
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  const hamburgerEvent = new CustomEvent('left-drawer');
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.mobileNav) {
      onHamburgerClick();
    }
  });

  function onHamburgerClick() {
    state.mobileNav = !state.mobileNav;
    dispatchEvent(hamburgerEvent);
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (messagesArea.value) {
        messagesArea.value!.scrollTop = messagesArea.value!.scrollHeight;
      }
    }, 150);
  }

  function onUpdateAction(data: string) {
    onEditClose();
    if (data === 'private') {
      handleGetRoomUsers();
    }
  }

  function handleGetRoomUsers() {
    getRoomUsers(<string>roomId)
      .then((data) => {
        state.users = data.response;
        state.usersLoading = false;
      })
      .catch(() => {});
  }

  defineExpose({
    state,
    subTitle,
    onEditClick,
    onEditClose,
    onDeleteAction,
    onClickInvite,
    onInviteClose,
    onMessageInputChange,
    onMessageClickSend,
    sendChatRoomMessage,
    onHamburgerClick,
    scrollToBottom,
    handleGetRoomUsers,
    onUpdateAction,
  });
</script>

<style scoped lang="scss">
  .room-page {
    @apply flex flex-col h-screen;

    &__top {
      @apply flex items-center justify-between p-5;

      .title {
        @apply text-xl;
      }

      .sub-title {
        @apply text-sm;
      }
    }

    .room-info {
      @apply px-4;
    }

    .chat-container {
      @apply flex flex-grow overflow-hidden mt-3 border-t border-gray-200;

      &__users {
        @apply hidden md:block min-w-[230px] max-w-[230px] border-r border-gray-200 pt-3 px-3 overflow-auto;

        .title {
          @apply font-bold text-lg mb-3;
        }
      }

      &__right {
        @apply flex flex-col flex-grow;

        .chat {
          @apply flex flex-col flex-grow overflow-y-scroll px-5 scroll-smooth;
        }

        .message-box {
          @apply flex space-x-2 items-center border-t border-gray-200 px-3 py-2;
        }
      }
    }
  }
</style>
