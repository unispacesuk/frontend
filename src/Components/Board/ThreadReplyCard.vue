<template>
  <div class="container smooth">
    <div class="container__top">
      <div class="container__user">
        <div>
          <template v-if="reply.avatar">
            <img class="w-[70px] rounded-full" :src="avatarBase + reply.avatar" alt="avatar" />
          </template>
          <template v-else>
            <img
              class="w-[70px] rounded-full"
              :src="avatarApi + reply.username + '.svg'"
              alt="avatar"
            />
          </template>
        </div>
        <div>
          {{ reply.username }}
        </div>
      </div>

      <div class="container__content" v-html="reply.content"></div>
    </div>

    <div class="container__bottom">
      {{ new Date(reply.createdAt).toDateString() }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';

  const avatarBase = inject('avatarBase');
  const avatarApi = inject('avatarApi');
  const props = defineProps<{
    reply: any;
  }>();
</script>

<style scoped lang="scss">
  .container {
    @apply border border-gray-200 mt-3 rounded-md p-3 hover:shadow-md;

    &__top {
      @apply flex mb-3
    }

    &__user {
      @apply w-1/5 flex flex-col items-center border-r border-gray-200;
    }

    &__content {
      @apply w-full px-4 py-3;
    }

    &__bottom {
      @apply border-t border-gray-200 text-sm pt-3 px-3 text-gray-500;
    }
  }
</style>
