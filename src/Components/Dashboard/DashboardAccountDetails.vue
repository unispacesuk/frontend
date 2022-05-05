<template>
  <div class="top_content">
    <div class="title mb-5">Account Details</div>

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
    <form class="user-details-form">
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
        <div class="flex space-x-2 items-center">
          <Input
            placeholder="username"
            :input-value="state.user.email"
            @input-change="handleEmailChange"
            :disabled="!state.isEditingEmail"
          />
          <ButtonActionSecondary
            :label="state.isEditingEmail ? 'Done' : 'Change'"
            @button-click="handleEmailEdit"
          />
        </div>
      </div>
    </form>

    <div class="title mt-5">University and School</div>
    <form class="user-details-form">
      <div class="form__input">
        <Label class="label" label="University" />
        <Input
          placeholder="university"
          :input-value="state.user.university"
          @input-change="handleUniversityChange"
        />
      </div>
      <div class="form__input">
        <Label class="label" label="School" />
        <Input
          placeholder="school"
          :input-value="state.user.school"
          @input-change="handleSchoolChange"
        />
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

    <div class="title mt-5">Privacy</div>
    <div class="sub-title">
      Here you can enable or disable your profile and blog visibility. <br />
      Disabling your profile or blog will prevent from other users to view your profile or blog
      articles.
    </div>
    <div class="flex flex-col space-y-2">
      <div class="flex justify-between w-[150px]">
        <div>Profile</div>
        <Toggle
          :checked="state.user.privacy.profile"
          @toggle-change="(v) => onPrivacyToggle('profile', v)"
        />
      </div>
      <div class="flex justify-between w-[150px]">
        <div>Blog</div>
        <Toggle
          :checked="state.user.privacy.blog"
          @toggle-change="(v) => onPrivacyToggle('blog', v)"
        />
      </div>
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

  <Modal title="View Avatar" v-if="state.isViewingAvatar" @close-modal="onCloseAvatarViewer">
    <AvatarCrop :avatar="state.dataUrl" />
    <ButtonActionPrimary
      class="flex space-x-2"
      @button-click="onClickUploadAvatar"
      :disabled="state.isUploadingAvatar"
    >
      <div>Upload</div>
      <Spinner class="w-5" v-if="state.isUploadingAvatar" />
    </ButtonActionPrimary>
  </Modal>
</template>

<script setup lang="ts">
  import { capitalize, inject, onBeforeUnmount, reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import {
    updateUserPrivacySetting,
    updateUserProfile,
    uploadAvatar,
  } from '../../Services/User/UserService';
  import { IBus } from '../../Interfaces/IBus';
  import { IUser } from '../../Interfaces/User/IUser';
  import CurrentAvatar from '../../Components/User/CurrentAvatar.vue';
  import Input from '../../Components/Form/Input.vue';
  import Label from '../../Components/Form/Label.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import DashboardChangePasswordModal from './DashboardChangePasswordModal.vue';
  import Modal from '../Modal/Modal.vue';
  import AvatarCrop from '../User/AvatarCrop.vue';
  import Toggle from '../Buttons/Toggle.vue';

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
    user: <IUser>currentUser,
    selectedFile: <Blob>{},
    dataUrl: <string | ArrayBuffer | null>null,
    isViewingAvatar: false,
    isUploadingAvatar: false,
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
      university: state.user.university,
      school: state.user.school,
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

  const userStore = useUser();

  function upload() {
    state.isUploadingAvatar = true;

    const formData = new FormData();
    formData.append('avatar', state.selectedFile);

    uploadAvatar(formData)
      .then((d) => {
        userStore.user.avatar = d.avatar.avatar;
        $bus?.emit('add-toast', 'Avatar updated successfully.', 'success');
        state.isUploadingAvatar = false;
        state.isViewingAvatar = false;
        state.dataUrl = null;
        state.selectedFile = <Blob>{};
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function fileSelect(files: any) {
    state.selectedFile = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      state.dataUrl = e.target!.result;
      state.isViewingAvatar = true;
    };
    reader.readAsDataURL(state.selectedFile);

    state.isViewingAvatar = true;
  }

  function onClickUploadAvatar() {
    upload();
  }

  function onCloseAvatarViewer() {
    state.isViewingAvatar = false;
    state.dataUrl = null;
    state.selectedFile = <Blob>{};
  }

  function onPrivacyToggle(type: string, value: boolean) {
    const data = {
      type,
      value,
    };
    updateUserPrivacySetting(data)
      .then(() => {
        userStore.user.privacy[type] = value;
        $bus?.emit('add-toast', `Made your ${capitalize(type)} ${value ? 'private' : 'public'}.`);
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function handleUniversityChange(value: string) {
    state.hasChanged = true;
    return (state.user.university = value);
  }

  function handleSchoolChange(value: string) {
    state.hasChanged = true;
    return (state.user.school = value);
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
    onClickUploadAvatar,
    onCloseAvatarViewer,
    handleUniversityChange,
    handleSchoolChange,
  });
</script>

<style scoped lang="scss">
  .top_content {
    @apply flex flex-col border-b border-gray-200 pb-4;

    .change-avatar-button {
      @apply px-4 py-2 uppercase font-bold bg-gray-100 text-sm rounded-md text-$accent cursor-pointer hover:bg-gray-200;
    }

    .user-details-form {
      @apply flex flex-col md:flex-row md:space-x-3;

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
