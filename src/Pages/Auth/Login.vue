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
        <Button @click="handleDoLogin" class="flex items-center" type="primary"
          >Login <Spinner class="w-5 ml-2" v-if="loginLoading"
        /></Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../../Components/Form/Input.vue';
import Button from '../../Components/Buttons/Button.vue';
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
</script>
