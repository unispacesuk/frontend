<template>
  <div class="flex justify-center">
    <div class="w-full lg:w-2/3 xl:w-2/4 p-10">
      <form @submit.prevent class="space-y-3">
        <div class="text-2xl">Login to Unispaces</div>
        <Input
          class="w-full"
          type="text"
          placeholder="username"
          @input-change="(v) => (username = v)"
        />
        <Input
          class="w-full"
          type="password"
          placeholder="password"
          @input-change="(v) => (password = v)"
        />
        <div class="flex items-center space-x-4">
          <ButtonActionPrimary
            class="flex space-x-2"
            @button-click="handleDoLogin"
            :disabled="loginLoading"
          >
            <div>Login</div>
            <Spinner class="w-5" v-if="loginLoading" />
          </ButtonActionPrimary>
          <div
            class="text-$accent hover:cursor-pointer hover:text-gray-500 smooth-fast"
            @click="onClickChangePasswordOpen"
          >
            Forgot Password?
          </div>
        </div>
      </form>
    </div>
  </div>

  <ChangePasswordDialog
    v-if="state.isChangePasswordDialogOpen"
    @close-modal="onChangePasswordClose"
  />
</template>

<script setup lang="ts">
  import { ref, inject, reactive } from 'vue';
  import { IBus } from '../../Interfaces/IBus';
  import { doLogin } from '../../Services/Auth/AuthService';
  import { useUser } from '../../Stores/UserStore';
  import { storeToRefs } from 'pinia';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import Input from '../../Components/Form/Input.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import { router } from '../../Router';
  import ChangePasswordDialog from '../../Components/Auth/ChangePasswordDialog.vue';
  import { WebsocketClient } from '../../Services/Websockets/WebsocketClient';

  const userStore = useUser();
  const { user } = storeToRefs(userStore);

  const $bus: IBus | undefined = inject('$bus');
  const username = ref<string>('');
  const password = ref<string>('');

  const loginLoading = ref<boolean>(false);

  const state = reactive({
    isChangePasswordDialogOpen: false,
  });

  function handleDoLogin() {
    loginLoading.value = true;
    if (!username.value || !password.value) {
      loginLoading.value = false;
      return $bus?.emit('add-toast', 'Enter all details.', 'error');
    }

    const data = {
      username: username.value,
      not_username: password.value,
    };

    doLogin(data)
      .then((d) => {
        loginLoading.value = false;
        $bus?.emit('add-toast', 'Successfully logged in.', 'success');
        userStore.$patch({
          user: d.user,
        });
        localStorage.setItem('access-token', d.token);
        router.push('/');
        new WebsocketClient();
      })
      .catch((e) => {
        loginLoading.value = false;
        if (e.response) {
          $bus?.emit('add-toast', e.response.data.error, 'error');
          return;
        }
        $bus?.emit('add-toast', 'Something went wrong.\nPlease try again.', 'error');
      });
  }

  function onClickChangePasswordOpen() {
    state.isChangePasswordDialogOpen = true;
  }

  function onChangePasswordClose() {
    state.isChangePasswordDialogOpen = false;
  }
</script>
