<template>
  <div>
    <div class="text-2xl flex items-center px-5 py-3 space-x-3 border-b border-gray-200">
      <div>
        <template v-if="user.avatar">
          <img class="w-12 rounded-full" :src="avatarBase + user.avatar" :alt="user.username" />
        </template>
        <template v-else>
          <img
            class="w-12 rounded-full"
            :src="avatarApi + user.username + '.svg'"
            :alt="user.username"
          />
        </template>
      </div>
      <div>Welcome to the Administration Panel, {{ user.username }}!</div>
    </div>

    <BoardCategories />

    <div class="p-5">Last 10 questions....</div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import BoardCategories from '../../Components/Admin/Board/Categories.vue';

  const avatarBase = inject('avatarBase');
  const avatarApi = inject('avatarApi');
  const { user } = storeToRefs(useUser());
</script>
