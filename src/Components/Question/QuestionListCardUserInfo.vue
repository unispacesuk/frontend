<template>
  <div class="px-10 space-y-2 h-[100px] w-full">
    <template v-if="state.loading">
      <AvatarSkeleton class="w-[70px] h-[70px]" />
    </template>
    <template v-else>
      <div class="w-[70px] h-[70px] rounded-full overflow-hidden">
        <UserAvatar :user="user" size="lg" />
      </div>
      <div class="w-full">{{ user.username }}</div>
    </template>
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
