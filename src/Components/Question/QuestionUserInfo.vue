<template>
  <div class="px-10 space-y-2 h-[100px]">
    <div v-if="loading">
      <!--      <Spinner class="w-5" />-->
      <AvatarSkeleton class="w-[70px] h-[70px]" />
    </div>
    <div v-if="!loading">
      <img
        class="w-[70px] h-[70px] rounded-full"
        :src="user.avatar || `https://avatars.dicebear.com/api/male/${user.username}.svg`"
        alt="avatar"
      />
      <div class="w-full">{{ user.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AvatarSkeleton from '../Skeletons/AvatarSkeleton.vue';
import { Get } from '../../Util/Request';
import { IUser } from '../../Interfaces/User/IUser';

const props: any = defineProps({
  userId: Number, // TODO: Any? no!
});

const loading = ref<boolean>(true);
const user = ref<any>();

onBeforeMount(async () => {
  Get(`user/data/${props.userId}`).then((d) => {
    user.value = d.body.user;
    loading.value = false;
  });
});
</script>
