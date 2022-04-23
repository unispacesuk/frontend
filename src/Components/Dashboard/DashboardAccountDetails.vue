<template>
  <div class="top_content">
    <div class="title mb-5">My Account</div>

    <div class="flex items-center space-x-2">
      <CurrentAvatar size="lg" />
      <form>
        <label for="avatar">
          <div class="change-avatar-button smooth">Change Avatar</div>
        </label>

        <input type="file" class="hidden" id="avatar" @change="fileSelect($event.target.files)" />
      </form>
    </div>

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
  import { inject, onBeforeUnmount, reactive, ref } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { updateUserProfile, uploadAvatar } from '../../Services/User/UserService';
  import { IBus } from '../../Interfaces/IBus';
  import CurrentAvatar from '../../Components/User/CurrentAvatar.vue';
  import Input from '../../Components/Form/Input.vue';
  import Label from '../../Components/Form/Label.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import DashboardChangePasswordModal from './DashboardChangePasswordModal.vue';

  onBeforeUnmount(() => {
    $bus?.forget('update-user-profile');
  });

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

  const selectedFile = ref();
  const userStore = useUser();

  function upload() {
    const formData = new FormData();
    formData.append('avatar', selectedFile.value);

    uploadAvatar(formData)
      .then((d) => {
        userStore.user.avatar = d.avatar.avatar;
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
      });
  }

  // const dataUrl = ref();
  function fileSelect(files: any) {
    selectedFile.value = files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   dataUrl.value = e.target!.result;
    //   cropping.value = true;
    // };
    // reader.readAsDataURL(selectedFile.value);
    //
    // cropping.value = true;

    upload();
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

    .change-avatar-button {
      @apply px-4 py-2 uppercase font-bold bg-gray-100 text-sm rounded-md text-$accent cursor-pointer hover:bg-gray-200;
    }

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
