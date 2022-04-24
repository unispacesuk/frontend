<template>
  <div class="flex p-2 mb-3 border-b border-gray-300 rounded-md table-hover space-x-5 items-center">
    <div>
      <UserAvatar
        :user="{ username: thread.user.username, avatar: thread.user.avatar }"
        size="sm"
      />
    </div>
    <div>
      <div class="text-lg">{{ thread.thread.title }}</div>
      <div class="text-xs text-gray-400">
        {{ new Date(thread.thread.created_at).toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { IThread } from '../../Interfaces/Board/IThread';
  import UserAvatar from '../User/UserAvatar.vue';

  const avatarBase = inject<string>('avatarBase');
  const avatarApi = inject<string>('avatarApi');

  const props = defineProps<{
    thread: {};
  }>();
</script>
