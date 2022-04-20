<template>
  <div class="w-full bg-slate-100 h-full rounded-md flex flex-col items-center py-6 space-y-3">
    <div>
      <UserAvatar :user="{ username, avatar }" size="xl" />
    </div>
    <div>
      {{ username }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, inject } from 'vue';
  import UserAvatar from '../User/UserAvatar.vue';

  const props = defineProps<{
    avatar?: string;
    username: string;
  }>();

  const avatarBase = inject<string>('avatarBase');
  const avatarApi = inject<string>('avatarApi');
</script>
