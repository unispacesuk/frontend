<template>
  <div class="top_content">
    <div class="title mb-5">My Account</div>

    <CurrentAvatar size="lg" />

    <div class="title mt-5">User Profile</div>
    <form class="form">
      <div class="form__input">
        <Label class="label" label="Username" />
        <Input
          placeholder="username"
          :input-value="state.user.username"
          @input-change="handleUsernameChange"
        />
      </div>
      <div class="form__input">
        <Label class="label" label="First Name" />
        <Input
          placeholder="username"
          :input-value="state.user.firstName"
          @input-change="handleFirstNameChange"
        />
      </div>
      <div class="form__input">
        <Label class="label" label="Last Name" />
        <Input
          placeholder="username"
          :input-value="state.user.lastName"
          @input-change="handleLastNameChange"
        />
      </div>
    </form>

    <div class="title mt-5">Email</div>
    <form class="form">
      <div class="form__input">
        <div>
          <Label class="label" label="Email Address" />
        </div>
        <div class="flex space-x-2">
          <Input
            placeholder="username"
            :input-value="state.user.email"
            @input-change="handleEmailChange"
            :disabled="!state.isEditingEmail"
          />
          <ButtonActionSecondary label="Change" @button-click="handleEmailEdit" />
        </div>
      </div>
    </form>

    <div class="title mt-5">Password</div>
    <div class="sub-title">
      Change your password if you feel your current one is not secure enough.
    </div>
    <div class="flex">
      <ButtonActionSecondary class="py-10" @button-click="handleUpdatePassword">
        Update Password
      </ButtonActionSecondary>
    </div>
  </div>

  <div class="bottom_content">
    <div>
      <ButtonActionPrimary
        class="flex space-x-2 mt-2"
        :disabled="state.isSubmittingProfile || !state.hasChanged"
        @button-click="$bus.emit('update-user-profile')"
      >
        <div>Save Changes</div>
        <Spinner v-if="state.isSubmittingProfile" class="w-5" />
      </ButtonActionPrimary>
    </div>
  </div>

  <DashboardChangePasswordModal
    :is-updating-password="state.isUpdatingPassword"
    @close-updating-password="state.isUpdatingPassword = false"
  />
</template>

<script setup lang="ts">
  import { reactive, inject } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { updateUserProfile } from '../../Services/User/UserService';
  import { IBus } from '../../Interfaces/IBus';
  import CurrentAvatar from '../../Components/User/CurrentAvatar.vue';
  import Input from '../../Components/Form/Input.vue';
  import Label from '../../Components/Form/Label.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import DashboardChangePasswordModal from './DashboardChangePasswordModal.vue';

  const $bus = inject<IBus>('$bus');
  $bus?.listen('update-user-profile', handleProfileUpdate);

  const { currentUser } = useUser();

  const emits = defineEmits<{
    (event: 'update-password'): void;
  }>();

  const state = reactive({
    isEditingEmail: false,
    isUpdatingPassword: false,
    isSubmittingProfile: false,
    hasChanged: false,
    user: currentUser,
  });

  function handleEmailEdit() {
    state.isEditingEmail = !state.isEditingEmail;
  }

  function handleProfileUpdate() {
    state.isSubmittingProfile = true;

    const data = {
      username: state.user.username,
      email: state.user.email,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
    };

    updateUserProfile(data)
      .then(() => {
        state.isSubmittingProfile = false;
        state.hasChanged = false;
        state.isEditingEmail = false;
        $bus?.emit('add-toast', 'Profile updated successfully.', 'success');
      })
      .catch(() => {
        state.isSubmittingProfile = false;
        state.isEditingEmail = false;
        $bus?.emit('add-toast', 'Failed to update profile.', 'error');
      });
  }

  function handleUsernameChange(value: string) {
    state.user.username = value;
    state.hasChanged = true;
  }

  function handleFirstNameChange(value: string) {
    state.user.firstName = value;
    state.hasChanged = true;
  }

  function handleLastNameChange(value: string) {
    state.user.lastName = value;
    state.hasChanged = true;
  }

  function handleEmailChange(value: string) {
    state.user.email = value;
    state.hasChanged = true;
  }

  function handleUpdatePassword() {
    state.isUpdatingPassword = true;
  }

  defineExpose({
    state,
    emits,
    handleUsernameChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleEmailEdit,
    handleUpdatePassword,
    handleProfileUpdate,
  });
</script>

<style scoped lang="scss">
  .top_content {
    @apply flex flex-col border-b border-gray-200 pb-4;

    .form {
      @apply flex space-x-3;

      .form__input {
        @apply flex flex-col flex-grow;
      }
    }

    .title {
      @apply text-xl font-bold;
    }

    .sub-title {
      @apply text-sm text-gray-500 py-2 px-3;
    }

    .label {
      @apply text-sm text-gray-500;
    }
  }

  .bottom_content {
    @apply flex justify-end;
  }
</style>
