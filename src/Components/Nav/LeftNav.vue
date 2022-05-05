<template>
  <div class="w-full flex flex-col text-center items-center pt-12 pb-20 left-nav">
    <!-- Avatar placeholder -->
    <div v-if="user.username">
      <div class="flex flex-col items-center space-y-2 mb-10">
        <Avatar />
        <div>{{ user.firstName }} {{ user.lastName }}</div>
        <!--        <div>{{ course }}</div>-->
        <div class="flex space-x-2">
          <div class="relative">
            <ChatAltIcon class="icon smooth-fast" />
            <!--            <div class="notification"></div>-->
          </div>
          <div class="relative">
            <BellIcon class="icon smooth-fast" @click="onBellClick" />
            <div v-if="state.hasNotification" class="notification"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right flex flex-col space-y-3 w-[60%]">
      <div v-if="!user.username" class="mb-4 flex flex-col space-y-3 mt-10">
        <div>
          <img src="/src/Assets/Logo-slate.png" alt="Logo" />
        </div>
        <router-link to="/login">
          <NavLink name="Login" route="login">
            <LockOpenIcon class="w-5" />
          </NavLink>
        </router-link>
        <router-link to="/register">
          <NavLink name="Register" route="register">
            <LockClosedIcon class="w-5" />
          </NavLink>
        </router-link>
      </div>
      <router-link to="/">
        <NavLink name="Home" route="home">
          <HomeIcon class="w-5" />
        </NavLink>
      </router-link>
      <router-link to="/boards">
        <NavLink name="Boards" route="board">
          <ClipboardIcon class="w-5" />
        </NavLink>
      </router-link>
      <router-link to="/questions">
        <NavLink name="Questions" route="question">
          <QuestionMarkCircleIcon class="w-5" />
        </NavLink>
      </router-link>
      <router-link to="/blogs">
        <NavLink name="Blogs" route="blogs">
          <RssIcon class="w-5" />
        </NavLink>
      </router-link>

      <div v-if="user.username" class="flex flex-col space-y-3">
        <!-- rooms page -->
        <router-link to="/rooms">
          <NavLink name="Rooms" route="rooms" class="relative">
            <div class="ping-blob" v-if="state.hasNewMessage"></div>
            <ChatAlt2Icon class="w-5" />
          </NavLink>
        </router-link>

        <!-- user dashboard // can change in the future -->
        <router-link to="/dashboard">
          <NavLink name="Dashboard" route="dashboard">
            <UserCircleIcon class="w-5" />
          </NavLink>
        </router-link>

        <!-- if user is admin -->
        <div v-if="user.roleId === 1">
          <router-link to="/admin">
            <NavLink name="Admin Panel" route="admin">
              <CogIcon class="w-5" />
            </NavLink>
          </router-link>
        </div>

        <!-- if user logged in -->
        <router-link to="/logout">
          <NavLink name="Logout" route="logout">
            <LogoutIcon class="w-5" />
          </NavLink>
        </router-link>
      </div>
    </div>
  </div>

  <NotificationsDialog
    v-if="state.isNotificationsOpen"
    :notifications="state.notifications"
    @action:close="onNotificationsClose"
  />
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAlertStore } from '../../Stores/AlertsStore';
  import { getNotifications } from '../../Services/User/UserService';
  import {
    ClipboardIcon,
    CogIcon,
    HomeIcon,
    LockClosedIcon,
    LockOpenIcon,
    LogoutIcon,
    QuestionMarkCircleIcon,
    RssIcon,
    UserCircleIcon,
    BellIcon,
    ChatAltIcon,
    ChatAlt2Icon,
  } from '@heroicons/vue/solid';
  import NavLink from './NavLink.vue';
  import Avatar from '../User/Avatar.vue';
  import NotificationsDialog from '../User/NotificationsDialog.vue';

  const { roomAlerts } = useAlertStore();
  const useAlerts = storeToRefs(useAlertStore());

  const props = defineProps<{
    user: any;
  }>();

  // new room message listener
  document.addEventListener('new-room-message', (event: any) => {
    const data = event.detail;
    if (data && data.metadata && data.metadata.sender._id !== data.userId) {
      const roomAlert = roomAlerts.find((room) => room.roomId === data.metadata.room_id);
      if (!roomAlert)
        return roomAlerts.push({ roomId: data.metadata.room_id, hasNewMessage: true });
      roomAlert.hasNewMessage = true;
    }
  });

  document.addEventListener('notification-bell', (e) => {
    useAlerts.bell.value = true;
  });

  const state = reactive({
    hasNewMessage: computed(() => {
      return roomAlerts.find((room) => room.hasNewMessage === true);
    }),
    hasNotification: computed(() => useAlerts.notification.value),
    isNotificationsOpen: false,
    notifications: [],
  });

  function onBellClick() {
    getNotifications()
      .then((data) => {
        state.notifications = data.response.notifications;
      })
      .catch(() => {});
    useAlerts.bell.value = false;
    return (state.isNotificationsOpen = true);
  }

  function onNotificationsClose() {
    return (state.isNotificationsOpen = false);
  }

  defineExpose({ state, roomAlerts, onBellClick, onNotificationsClose });
</script>

<style scoped lang="scss">
  .left-nav {
    .ping-blob {
      @apply w-2 h-2 bg-red-500 absolute -left-3 top-1/2 transform -translate-y-1/2 rounded-full;
    }

    .icon {
      @apply w-5 text-gray-400 hover:text-white cursor-pointer;
    }

    .notification {
      @apply absolute w-1.5 h-1.5 bg-red-500 rounded-full top-0 right-0;
    }
  }
</style>
