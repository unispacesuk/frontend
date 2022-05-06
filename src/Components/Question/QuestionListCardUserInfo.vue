<template>
  <div class="px-10 space-y-2 h-auto w-full">
    <div v-if="state.loading">
      <AvatarSkeleton class="w-[100px] h-[100px]" />
    </div>
    <div v-else>
      <UserAvatar :user="user" size="lg" />
      <div class="w-full">{{ user.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeMount, reactive, ref } from 'vue';
  import { Get } from '../../Util/Request';
  import AvatarSkeleton from '../Skeletons/AvatarSkeleton.vue';
  import UserAvatar from '../User/UserAvatar.vue';

  const props: any = defineProps<{
    userId: any;
  }>();

  const state = reactive({
    loading: true,
    user: null,
  });

  const loading = ref<boolean>(true);
  const user = ref<any>();

  onBeforeMount(async () => {
    Get(`user/data/id/${props.userId}`)
      .then((data) => {
        user.value = data.response;
        nextTick(() => {
          state.loading = false;
        });
      })
      .catch(() => {});
  });
</script>
