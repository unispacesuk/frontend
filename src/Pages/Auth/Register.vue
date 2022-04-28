<template>
  <div class="flex justify-center">
    <div class="w-full lg:w-2/3 xl:w-2/4 p-10">
      <form @submit.prevent class="space-y-3">
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
          :class="!passwordsMatch ? 'outline outline-$error/50 focus:outline-$error/50' : ''"
          type="password"
          placeholder="password"
          @input-change="(v) => (password = v)"
        />
        <Input
          class="w-full"
          :class="!passwordsMatch ? 'outline outline-$error/50 focus:outline-$error/50' : ''"
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
        <ButtonActionPrimary
          class="flex space-x-2"
          @button-click="handleDoRegister"
          :disabled="registerLoading"
        >
          <div>Register</div>
          <Spinner class="w-5" v-if="registerLoading" />
        </ButtonActionPrimary>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { IBus } from '../../Interfaces/IBus';
  import { doRegister } from '../../Services/Auth/AuthService';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import Input from '../../Components/Form/Input.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';

  const $bus: IBus | undefined = inject('$bus');
  const email = ref<string>('');
  const username = ref<string>('');
  const password = ref<string>('');
  const passwordVerify = ref<string>('');
  const firstName = ref<string>('');
  const lastName = ref<string>('');
  const passwordsMatch = ref<boolean>(true);
  const registerLoading = ref<boolean>(false);

  const router = useRouter();

  function handleDoRegister() {
    registerLoading.value = true;
    if (password.value !== passwordVerify.value) {
      registerLoading.value = false;
      return $bus?.emit('add-toast', 'The passwords do not match.', 'error');
    }

    if (username.value.length < 5) {
      registerLoading.value = false;
      return $bus?.emit('add-toast', 'The username must be at least 5 characters long.', 'error');
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
      return $bus?.emit('add-toast', 'Enter all details.', 'error');
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
        $bus?.emit('add-toast', d.message, 'success');
        router.push('login');
      })
      .catch((e) => {
        if (e.response) {
          // handle error with response
          // console.log(e.response);
          $bus?.emit('add-toast', 'Some error occurred.', 'error');
          registerLoading.value = false;
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
