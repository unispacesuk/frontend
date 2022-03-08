<template>
  <div class="flex p-2 mb-3 border-b border-gray-300 rounded-md table-hover space-x-5 items-center">
    <div>
      <div class="w-12 h-12">
        <img
          v-if="thread.avatar"
          :src="avatarBase + thread.avatar"
          class="rounded-full"
          alt="avatar"
        />
        <img v-else :src="avatarApi + thread.username + '.svg'" class="rounded-full" alt="avatar" />
      </div>
    </div>
    <div>
      <div class="text-lg">{{ thread.title }}</div>
      <div class="text-xs text-gray-400">{{ new Date(thread.createdAt).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { IThread } from '../../Interfaces/Board/IThread';

  const avatarBase = inject<string>('avatarBase');
  const avatarApi = inject<string>('avatarApi');

  const props = defineProps<{
    thread: IThread;
  }>();
</script>
