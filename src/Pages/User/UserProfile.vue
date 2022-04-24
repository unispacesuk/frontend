<template>
  {{ state.username }}
</template>

<script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const state = reactive({
    username: computed(() => route.params.username),
  });
</script>

<style scoped></style>
