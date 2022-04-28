<template>
  <div>this is some settings.... the user can enable / disable the blog or profile</div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const state = reactive({});

  defineExpose({ state });
</script>

<style scoped lang="scss"></style>
