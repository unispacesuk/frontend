<template>
  <div class="w-full bg-slate-100 h-full rounded-md flex flex-col items-center py-6 space-y-3">
    <div>
      <img v-if="avatar" class="w-[120px] rounded-full" :src="avatarBase + avatar" alt="avatar" />
      <img v-if="!avatar" class="w-[120px] rounded-full" :src="avatarApi + username + '.svg'" alt="avatar" />
    </div>
    <div>
      {{ username }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, inject } from 'vue';

  const props = defineProps<{
    avatar?: string;
    username: string;
  }>();

  const avatarBase = inject<string>('avatarBase');
  const avatarApi = inject<string>('avatarApi');
</script>
