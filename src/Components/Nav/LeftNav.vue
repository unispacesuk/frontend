<template>
  <div class="w-full flex flex-col text-center items-center pt-12 pb-20">
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

      <router-link to="/rooms">
        <NavLink name="Rooms" route="rooms">
          <ArchiveIcon class="w-5" />
        </NavLink>
      </router-link>

      <div v-if="user.username" class="flex flex-col space-y-3">
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
  import { defineComponent, PropType } from 'vue';
  import NavLink from './NavLink.vue';
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
  import Spinner from '../../Icons/Util/Spinner.vue';
  import { IUser } from '../../Interfaces/User/IUser';
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
      return {};
    },
    methods: {},
  });
</script>
