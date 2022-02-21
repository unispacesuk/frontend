<template>
  <div class="flex flex-col h-full">
    <div class="border-b border-gray-200 pb-3 pl-3 text-2xl">{{ question.title }}</div>
    <div class="p-3">{{ question.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  question: Object as any,
});

const question = ref(props.question);
</script>
