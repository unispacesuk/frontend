<template>
  <div class="border border-black rounded px-2 text-sm cursor-pointer hover:bg-gray-200 smooth">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string;
  }>();
</script>

<style scoped></style>
