<template>
  <div class="container">
    <div class="text-sm text-gray-500">{{ formattedDate() }}</div>
    <div class="flex space-x-2">
      <StarIcon
        @click="onClickFavourite"
        class="w-5 container__icon container__icon__button smooth"
      />
      <ShareIcon @click="onClickShare" class="w-5 container__icon container__icon__button smooth" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IThread } from '../../Interfaces/Board/IThread';
  import { ShareIcon, StarIcon } from '@heroicons/vue/solid';

  const props = defineProps<{
    thread: IThread;
  }>();

  function onClickFavourite() {
    alert('favourited thread');
  }

  function onClickShare() {
    alert('sharing this thread');
  }

  function formattedDate() {
    // @ts-ignore
    return new Date(props.thread.createdAt).toLocaleString();
  }
</script>

<style scoped lang="scss">
  .container {
    @apply w-full px-6 py-3 flex justify-between items-center border-t border-b border-gray-200;

    &__icon {
      @apply text-gray-400 hover:text-gray-800;

      &__button {
        @apply cursor-pointer;
      }
    }
  }
</style>
