<template>
  <template v-if="!state.users.length">
    <div class="text-sm text-gray-500">No recent activity.</div>
  </template>

  <template v-else>
    <div class="board-last-activity">
      <div v-for="(user, index) in state.users" :key="index" class="item">
        <RouterLink :to="{ name: 'userProfile', params: { username: user.username } }">
          <UserAvatar :user="user" size="xs" />
        </RouterLink>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { reactive, onBeforeMount } from 'vue';
  import { getRecentActivity } from '../../Services/Board/BoardsService';
  import UserAvatar from '../User/UserAvatar.vue';

  // temp interface
  interface IRecentUser {
    _id: number;
    username: string;
    avatar: string;
    thread_id: number;
  }

  const props = defineProps<{
    boardId: number;
  }>();

  onBeforeMount(() => {
    getRecentActivity(props.boardId)
      .then((data) => {
        state.users = data.response;
      })
      .then(() => {
        state.users.sort((a: IRecentUser, b: IRecentUser) => a.thread_id - b.thread_id);
      });
  });

  const state = reactive({
    users: [],
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .board-last-activity {
    @apply flex flex-row-reverse flex-shrink-0;

    .item {
      @apply -ml-3 flex-shrink-0 border-2 border-white bg-white rounded-full;
    }
  }
</style>
