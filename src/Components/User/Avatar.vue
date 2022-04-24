<template>
  <div class="relative flex justify-center">
    <!--          <Spinner class="w-5" />-->
    <AvatarSkeleton v-if="loading" class="w-28 h-28" />
    <div class="w-28 h-28 rounded-full overflow-hidden">
      <div v-if="userStore.user.avatar">
        <img
          :src="avatarBase + userStore.user.avatar"
          alt="avatar"
          class="rounded-full object-center object-cover w-28 h-28"
        />
      </div>
      <div v-if="!userStore.user.avatar">
        <img
          :src="`https://avatars.dicebear.com/api/male/${userStore.user.username}.svg`"
          alt="avatar"
          class="rounded-full"
        />
      </div>
    </div>
    <div
      class="absolute right-0 bottom-0 rounded-full cursor-pointer focus:outline-none bg-gray-800 p-1 text-gray-500 hover:text-white smooth"
    >
      <form>
        <label for="avatar-nav" class="cursor-pointer">
          <CameraIcon class="w-5" />
        </label>

        <input
          type="file"
          class="hidden"
          id="avatar-nav"
          @change="fileSelect($event.target.files)"
        />
      </form>
    </div>
    <!--    <Modal v-if="cropping" @close-modal="cropping = false">-->
    <!--      <AvatarCrop :avatar="dataUrl" />-->
    <!--    </Modal>-->
  </div>
</template>

<script setup lang="ts">
  import { ref, inject } from 'vue';
  import AvatarSkeleton from '../Skeletons/AvatarSkeleton.vue';
  import { CameraIcon } from '@heroicons/vue/solid';
  import { uploadAvatar } from '../../Services/User/UserService';
  import { useUser } from '../../Stores/UserStore';
  import AvatarCrop from './AvatarCrop.vue';
  import Modal from '../Modal/Modal.vue';

  const loading = ref<boolean>();
  const selectedFile = ref();
  const userStore = useUser();
  const cropping = ref<boolean>();

  const avatarBase = inject('avatarBase');

  function upload() {
    loading.value = true;
    const formData = new FormData();
    formData.append('avatar', selectedFile.value);

    uploadAvatar(formData)
      .then((d) => {
        userStore.user.avatar = d.avatar.avatar;
        loading.value = false;
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
          loading.value = false;
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
</script>
