<template>
  <div class="px-10 space-y-2 h-[100px] w-full">
    <div v-if="loading">
      <!--      <Spinner class="w-5" />-->
      <AvatarSkeleton class="w-[70px] h-[70px]" />
    </div>
    <div v-if="!loading">
      <div class="w-[70px] h-[70px] rounded-full overflow-hidden">
        <img
          v-if="user.avatar"
          :src="avatarBase + user.avatar"
          alt="avatar"
          class="w-[70px] h-[70px] object-cover object-center"
        />
        <img
          v-if="!user.avatar"
          :src="`https://avatars.dicebear.com/api/male/${user.username}.svg`"
          alt="avatar"
        />
      </div>
      <div class="w-full">{{ user.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, inject } from 'vue';
import AvatarSkeleton from '../Skeletons/AvatarSkeleton.vue';
import { Get } from '../../Util/Request';

const props: any = defineProps({
  userId: Number, // TODO: Any? no!
});

const loading = ref<boolean>(true);
const user = ref<any>();
const avatarBase = inject('avatarBase');

onBeforeMount(async () => {
  Get(`user/data/${props.userId}`).then((d) => {
    user.value = d.user;
    loading.value = false;
  }).catch((e) => {
    console.log(e);
  });
});
</script>
