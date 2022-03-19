<template>
  <div class="flex flex-col justify-center items-center py-5">
    <div>
      <img src="/src/Assets/empty-folder.png" width="100" alt="empty folder" />
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string;
  }>();
</script>
