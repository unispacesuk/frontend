<template>
  <div class="flex justify-center">
    <div class="w-1/4">
      <form @submit.prevent class="space-y-3 py-20">
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
        <ButtonPrimary @click="handleDoLogin" class="flex items-center"
          >Login <Spinner class="w-5 ml-2" v-if="loginLoading"
        /></ButtonPrimary>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../../Components/Form/Input.vue';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import { ref, inject } from 'vue';
import { IBus } from '../../Interfaces/IBus';
import { doLogin } from '../../Services/User/AuthService';
import Spinner from '../../Icons/Util/Spinner.vue';

import { useUser } from '../../Stores/UserStore';
import { storeToRefs } from 'pinia';
import { router } from '../../Router';

const userStore = useUser();
const { user } = storeToRefs(userStore);

const $bus: IBus | undefined = inject('$bus');
const username = ref<string>('');
const password = ref<string>('');

const loginLoading = ref<boolean>(false);

function handleDoLogin() {
  loginLoading.value = true;
  if (!username.value || !password.value) {
    loginLoading.value = false;
    return $bus?.emit('add-toast', 'Enter all details.');
  }

  const data = {
    username: username.value,
    not_username: password.value,
  };

  doLogin(data)
    .then((d) => {
      loginLoading.value = false;
      $bus?.emit('add-toast', 'Successfully logged in.');
      userStore.$patch({
        user: d.user,
      });
      localStorage.setItem('access-token', d.token);
      router.push('/');
    })
    .catch((e) => {
      loginLoading.value = false;
      if (e.response) {
        $bus?.emit('add-toast', e.response.data.body.error);
        return;
      }
      $bus?.emit('add-toast', 'Something went wrong.\nPlease try again.');
    });
}
</script>
