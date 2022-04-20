<template>
  <div>
    <template v-if="user.avatar">
      <img
        :src="avatarBase + user.avatar"
        :class="avatarSize"
        :alt="user.username"
        class="rounded-full object-cover"
      />
    </template>

    <template v-else>
      <img
        :src="avatarApi + user.username + '.svg'"
        :class="avatarSize"
        :alt="user.username"
        class="rounded-full object-cover"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { AvatarSize } from '../../Util/Types';

  const avatarBase = inject('avatarBase');
  const avatarApi = inject('avatarApi');

  const props = defineProps<{
    user: any;
    size: AvatarSize;
  }>();

  // TODO: maybe export this?
  const avatarSize = computed(() => {
    return props.size === 'xs'
      ? 'w-[35px] h-[35px]'
      : props.size === 'sm'
      ? 'w-[50px] h-[50px]'
      : props.size === 'md'
      ? 'w-[75px] h-[75px]'
      : props.size === 'lg'
      ? 'w-[100px] h-[100px]'
      : props.size === 'xl'
      ? 'w-[130px] h-[130px]'
      : 'w-[10px]';
  });
</script>

<style scoped lang="scss"></style>
