<template>
  <div class="card_info">
    <div class="card_info__user_info">
      <div>
        <img class="w-[110px] rounded-full" :src="avatarApi + username + '.svg'" alt="avatar" />
      </div>
      <div>Ricardo Rocha</div>
      <div>BSc Computer Science</div>
    </div>
    <div class="card_info__reactions">
      <ReactionButton>
        <div>😄</div>
        <div>10</div>
      </ReactionButton>
      <ReactionButton>
        <div>😍</div>
        <div>10</div>
      </ReactionButton>
      <ReactionButton>
        <div>🤣</div>
        <div>10</div>
      </ReactionButton>
      <ReactionButton>
        <div>😯</div>
        <div>10</div>
      </ReactionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import ReactionButton from '../Buttons/ReactionButton.vue';

  const props = defineProps<{
    username: string;
    avatar?: string;
  }>();

  const avatarApi = inject('avatarApi');
</script>

<style scoped lang="scss">
  .card_info {
    @apply flex flex-col items-center space-y-5 border-r border-gray-200 text-center;

    &__user_info {
      @apply flex flex-col items-center;
    }

    &__reactions {
      @apply grid grid-cols-2 gap-2;
    }
  }
</style>
