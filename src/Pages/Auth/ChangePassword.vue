<template>
  <div v-if="state.isLoading">Loading ...</div>
  <div v-if="!state.isLoading" class="update-password-content">
    <template v-if="state.isBrokenToken">
      <div class="alert alert-danger" role="alert">
        <strong>Error!</strong>
        <p>The token is broken.</p>
      </div>
    </template>

    <template v-else>
      <div class="title">Update Password</div>

      <div class="input-row">
        <Label class="label" label="New Password" />
        <Input type="password" @input-change="(value) => onInputChange(value, 'new')" />
      </div>
      <div class="input-row">
        <Label class="label" label="Confirm New Password" />
        <Input type="password" @input-change="(value) => onInputChange(value, 'confirm')" />
      </div>

      <div class="buttons-row">
        <ButtonActionPrimary
          class="flex space-x-2"
          @button-click="onClickUpdatePassword"
          :disabled="!state.isPasswordValid"
        >
          <div>Update Password</div>
          <Spinner v-if="state.isUpdating" class="w-5" />
        </ButtonActionPrimary>
      </div>
      <div class="success-message smooth" v-if="state.showSuccessMessage">
        Your password has been updated successfully.<br />
        Redirecting in 5 seconds.
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, onBeforeMount, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { submitUpdatePassword, verifyChangePasswordToken } from '../../Services/Auth/AuthService';
  import { IBus } from '../../Interfaces/IBus';
  import Input from '../../Components/Form/Input.vue';
  import Label from '../../Components/Form/Label.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const route = useRoute();
  const router = useRouter();
  const $bus = inject<IBus>('$bus');

  const query = computed(() => {
    return route.query;
  });

  const state = reactive({
    isLoading: true,
    isBrokenToken: false,
    password: {
      new: '',
      confirm: '',
    },
    isUpdating: false,
    showSuccessMessage: false,
    isPasswordValid: false,
  });

  if (!query.value.token) {
    state.isBrokenToken = true;
  }

  onBeforeMount(() => {
    verifyChangePasswordToken(<string>query.value.token || '')
      .then(() => {
        state.isLoading = false;
      })
      .catch(() => {
        state.isBrokenToken = true;
      });
  });

  function onInputChange(value: string, key: string) {
    // @ts-ignore
    state.password[key] = value;

    state.isPasswordValid =
      state.password.new === state.password.confirm && state.password.new.length >= 8;
  }

  function onClickUpdatePassword() {
    state.isUpdating = true;

    if (
      state.password.new !== state.password.confirm ||
      state.password.new === '' ||
      state.password.confirm === ''
    ) {
      state.isUpdating = false;
      $bus?.emit('add-toast', 'Passwords are invalid.', 'error');
      return;
    }

    const data = {
      token: <string>query.value.token || '',
      password: state.password.new,
      passwordConfirm: state.password.confirm,
    };

    submitUpdatePassword(data)
      .then(() => {
        state.isUpdating = false;
        state.showSuccessMessage = true;
        state.password = {
          new: '',
          confirm: '',
        };
        $bus?.emit('add-toast', 'Password updated successfully.', 'success');
        setTimeout(() => {
          window.location.href = '/login';
        }, 5000);
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        state.isUpdating = false;
      });
  }
</script>

<style scoped lang="scss">
  .update-password-content {
    @apply flex flex-col w-[400px] mx-auto my-5;

    .title {
      @apply text-2xl font-bold text-center mb-5;
    }

    .input-row {
      @apply flex flex-col;

      .label {
        @apply text-$accent;
      }
    }

    .input-row + div {
      @apply mt-3;
    }

    .buttons-row {
      @apply flex flex-row justify-end;
    }

    .success-message {
      @apply text-center text-sm font-medium text-gray-600 mt-5;
    }
  }
</style>
