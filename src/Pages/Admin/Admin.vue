<template>
  <div>
    <div class="text-2xl flex items-center px-5 py-3 space-x-3 border-b border-gray-200">
      <CurrentAvatar :user="currentUser" size="sm" />
      <div class="flex-shrink">
        Welcome to the Administration Panel, {{ currentUser.username }}!
      </div>
    </div>

    <BoardCategories />

    <QuestionsTable />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import BoardCategories from '../../Components/Admin/Board/Categories.vue';
  import CurrentAvatar from '../../Components/User/CurrentAvatar.vue';
  import QuestionsTable from '../../Components/Admin/Questions/QuestionsTable.vue';

  const { currentUser } = storeToRefs(useUser());
</script>
