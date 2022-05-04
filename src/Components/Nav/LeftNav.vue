<template>
  <div class="w-full flex flex-col text-center items-center pt-12 pb-20 left-nav">
    <!-- Avatar placeholder -->
    <div v-if="user.username">
      <div class="flex flex-col items-center space-y-2 mb-10">
        <Avatar />
        <div>{{ user.firstName }} {{ user.lastName }}</div>
        <!--        <div>{{ course }}</div>-->
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
            <ArchiveIcon class="w-5" />
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
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, reactive } from 'vue';
  import { useAlertStore } from '../../Stores/AlertsStore';
  import { IUser } from '../../Interfaces/User/IUser';
  import {
    CameraIcon,
    ClipboardIcon,
    CogIcon,
    HomeIcon,
    LockClosedIcon,
    LockOpenIcon,
    LogoutIcon,
    QuestionMarkCircleIcon,
    RssIcon,
    UserCircleIcon,
    ArchiveIcon,
  } from '@heroicons/vue/solid';
  import NavLink from './NavLink.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import AvatarSkeleton from '../Skeletons/AvatarSkeleton.vue';
  import Avatar from '../User/Avatar.vue';

  export default defineComponent({
    name: 'LeftNav',
    components: {
      Avatar,
      AvatarSkeleton,
      Spinner,
      HomeIcon,
      ClipboardIcon,
      QuestionMarkCircleIcon,
      CogIcon,
      UserCircleIcon,
      LogoutIcon,
      CameraIcon,
      LockClosedIcon,
      LockOpenIcon,
      NavLink,
      RssIcon,
      ArchiveIcon,
    },
    props: {
      user: {
        type: Object as PropType<IUser>,
      },
    },
    data() {
      return {
        file: '',
        loading: false,
      };
    },
    setup() {
      const { roomAlerts } = useAlertStore();

      // new room message listener
      document.addEventListener('new-room-message', (event: any) => {
        const data = event.detail;
        if (data && data.metadata) {
          const roomAlert = roomAlerts.find((room) => room.roomId === data.metadata.roomId);
          if (!roomAlert)
            return roomAlerts.push({ roomId: data.metadata.roomId, hasNewMessage: true });
          roomAlert.hasNewMessage = true;
        }
      });

      const state = reactive({
        hasNewMessage: computed(() => {
          return roomAlerts.find((room) => room.hasNewMessage === true);
        }),
      });

      return { state, roomAlerts };
    },
    methods: {},
  });
</script>

<style scoped lang="scss">
  .left-nav {
    .ping-blob {
      @apply w-2 h-2 bg-red-500 absolute -left-3 top-1/2 transform -translate-y-1/2 rounded-full;
    }
  }
</style>
