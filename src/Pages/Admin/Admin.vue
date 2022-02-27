<template>
  <div>
    <div class="text-2xl flex items-center px-5 py-3 space-x-3 border-b border-gray-200">
      <div>
        <img class="w-12 rounded-full" :src="avatarBase + user.avatar" :alt="user.username" />
      </div>
      <div>Welcome to the Administration Panel, {{ user.username }}!</div>
    </div>

    <BoardCategories />
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import BoardCategories from '../../Components/Admin/BoardCategories.vue';

  const avatarBase = inject('avatarBase');
  const { user } = storeToRefs(useUser());
</script>
