<template>
  <div>
    <template v-if="currentUser.avatar">
      <img
        :src="avatarBase + currentUser.avatar"
        :class="avatarSize"
        alt="avatar"
        class="rounded-full object-cover"
      />
    </template>

    <template v-else>
      <img
        :src="avatarApi + currentUser.username + '.svg'"
        :class="avatarSize"
        alt="avatar"
        class="rounded-full object-cover"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';

  const { currentUser } = storeToRefs(useUser());
  const avatarBase = inject('avatarBase');
  const avatarApi = inject('avatarApi');

  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  const props = defineProps<{
    size: Size;
  }>();

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
