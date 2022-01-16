<template>
  {{ $route.params.id }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Board',
});
</script>

<style scoped></style>
