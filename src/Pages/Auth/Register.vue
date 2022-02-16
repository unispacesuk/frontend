<template>
  <div class="flex justify-center">
    <div class="w-1/4">
      <form @submit.prevent class="space-y-3 py-20">
        <div class="text-2xl">Register to Unispaces</div>
        <Input class="w-full" type="text" placeholder="email" @input-change="(v) => (email = v)" />
        <Input
          class="w-full"
          type="text"
          placeholder="username"
          @input-change="(v) => (username = v)"
        />
        <Input
          class="w-full"
          :class="!passwordsMatch ? 'border-red-700 focus:border-red-700' : ''"
          type="password"
          placeholder="password"
          @input-change="(v) => (password = v)"
        />
        <Input
          class="w-full"
          :class="!passwordsMatch ? 'border-red-700 focus:border-red-700' : ''"
          type="password"
          placeholder="password verify"
          @input-change="handlePasswordVerifyInput"
        />
        <div class="flex space-x-2">
          <Input
            class="w-full"
            type="text"
            placeholder="first name"
            @input-change="(v) => (firstName = v)"
          />
          <Input
            class="w-full"
            type="text"
            placeholder="last name"
            @input-change="(v) => (lastName = v)"
          />
        </div>
        <ButtonPrimary @click="handleDoRegister" class="flex items-center"
          >Register <Spinner class="w-5 ml-2" v-if="registerLoading"
        /></ButtonPrimary>
      </form>
      <div>
        ... show error messages here ...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import Spinner from '../../Icons/Util/Spinner.vue';
import Input from '../../Components/Form/Input.vue';
import { IBus } from '../../Interfaces/IBus';
import { doRegister } from '../../Services/User/AuthService';

const $bus: IBus | undefined = inject('$bus');
const email = ref<string>('');
const username = ref<string>('');
const password = ref<string>('');
const passwordVerify = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const passwordsMatch = ref<boolean>(true);
const registerLoading = ref<boolean>(false);

function handleDoRegister() {
  registerLoading.value = true;
  if (password.value !== passwordVerify.value) {
    registerLoading.value = false;
    return $bus?.emit('add-toast', 'The passwords do not match.');
  }
  if (
    !email.value ||
    !username.value ||
    !password.value ||
    !passwordVerify.value ||
    !firstName.value ||
    !lastName.value
  ) {
    registerLoading.value = false;
    return $bus?.emit('add-toast', 'Enter all details');
  }

  const data = {
    email: email.value,
    username: username.value,
    not_username: password.value,
    first_name: firstName.value,
    last_name: lastName.value,
  };

  doRegister(data)
    .then((d) => {
      registerLoading.value = false;
      $bus?.emit('add-toast', d.message);
    })
    .catch((e) => {
      if (e.response) {
        // handle error with response
        console.log(e.response);
      }
    });
}

function handlePasswordVerifyInput(value: string) {
  passwordVerify.value = value;
  comparePasswords();
}

function comparePasswords() {
  if (password.value !== passwordVerify.value) {
    return (passwordsMatch.value = false);
  }

  passwordsMatch.value = true;
}
</script>
