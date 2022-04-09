<template>
  <div>
    <template v-if="user.avatar">
      <img :src="avatarBase + user.avatar" :class="avatarSize" :alt="user.username" class="rounded-full" />
    </template>

    <template v-else>
      <img
        :src="avatarApi + user.username + '.svg'"
        :class="avatarSize"
        :alt="user.username"
        class="rounded-full"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';

  const avatarBase = inject('avatarBase');
  const avatarApi = inject('avatarApi');

  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  const props = defineProps<{
    user: any;
    size: Size;
  }>();

  // TODO: maybe export this?
  const avatarSize = computed(() => {
    return props.size === 'xs'
      ? 'w-[35px]'
      : props.size === 'sm'
      ? 'w-[50px]'
      : props.size === 'md'
      ? 'w-[75px]'
      : props.size === 'lg'
      ? 'w-[100px]'
      : props.size === 'xl'
      ? 'w-[130px]'
      : 'w-[10px]';
  });
</script>

<style scoped lang="scss"></style>
