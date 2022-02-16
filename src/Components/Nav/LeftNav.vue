<template>
  <div class="w-full flex flex-col text-center items-center py-12">
    <!-- Avatar placeholder -->
    <div v-if="user.username">
      <div class="flex flex-col items-center space-y-2 mb-10">
        <div class="w-28 h-28 bg-red-300 rounded-full relative">
          <img src="https://i.pravatar.cc/300" alt="avatar" class="rounded-full" />
          <div
            class="absolute right-0 bottom-0 rounded-full cursor-pointer focus:outline-none bg-gray-800 p-1 text-gray-500 hover:text-white smooth"
          >
            <form>
              <label for="avatar" class="cursor-pointer">
                <CameraIcon class="w-5" />
              </label>

              <input type="file" class="hidden" id="avatar" />
              <!--                   @change="avatarService.assignAvatar($event)">-->
            </form>
          </div>
        </div>
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

      <div v-if="user.username" class="flex flex-col space-y-3">
        <!-- user dashboard // can change in the future -->
        <router-link to="/dashboard">
          <NavLink name="Dashboard" route="dashboard">
            <UserCircleIcon class="w-5" />
          </NavLink>
        </router-link>

        <!-- if user is admin -->
        <!--        <div v-if="role === 'admin'">-->
        <!--                  <router-link to="/admin">-->
        <!--                    <NavLink name="Admin Panel" route="admin">-->
        <!--                      <CogIcon class="w-5" />-->
        <!--                    </NavLink>-->
        <!--                  </router-link>-->
        <!--        </div>-->

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
import { defineComponent, PropType, ref } from 'vue';
import NavLink from './NavLink.vue';
import {
  HomeIcon,
  ClipboardIcon,
  QuestionMarkCircleIcon,
  CogIcon,
  UserCircleIcon,
  LogoutIcon,
  CameraIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/vue/solid';
import axios from 'axios';
import Spinner from '../../Icons/Util/Spinner.vue';
import { IUser } from '../../Interfaces/User/IUser';

export default defineComponent({
  name: 'LeftNav',
  components: {
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
  },
  props: {
    user: {
      type: Object as PropType<IUser>
    }
  },
  data() {
    return {
      file: '',
      loading: false,
    };
  },
  methods: {
    upload() {
      this.loading = true;
      const formData = new FormData();
      formData.append('avatar', this.file);

      axios
        .post('http://localhost:3000/test/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((r) => {
          console.log(r.data);
          this.loading = false;
        });
    },
    fileSelect(name: any, file: any) {
      this.file = file[0];
    },
  },
});
</script>
