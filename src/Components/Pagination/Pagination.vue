<template>
  <div class="flex justify-center py-5 space-x-2">
    <button @click="emit('prev-page')" class="outline-none">
      <ArrowNarrowLeftIcon class="button smooth px-2" />
    </button>
    <div v-if="showNumbers" v-for="(page, index) of pages" :key="index">
      <button
        class="button smooth outline-none"
        :class="{ 'bg-gray-800 text-white hover:text-black': page === currentPage }"
        @click="emit('go-to', page)"
        v-if="page >= currentPage - 2 && page <= +currentPage + 2"
      >
        {{ page }}
      </button>
    </div>
    <button @click="emit('next-page')" class="outline-none">
      <ArrowNarrowRightIcon class="button smooth px-2" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/vue/solid';

  defineProps<{
    showNumbers?: boolean;
    currentPage?: number;
    pages: number;
  }>();
  const emit = defineEmits<{
    (event: 'next-page'): void;
    (event: 'prev-page'): void;
    (event: 'go-to', page: number): void;
  }>();
</script>

<style>
  .button {
    @apply w-[35px] h-[35px] rounded-full flex justify-center items-center hover:bg-gray-200 cursor-pointer;
  }
</style>
