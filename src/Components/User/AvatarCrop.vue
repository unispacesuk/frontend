<template>
  <img class="avatar-sample" :src="avatar" alt="avatar to crop" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const props = defineProps({
    avatar: <any>null,
  });

  const state = reactive({
    avatar: props.avatar,
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .avatar-sample {
    @apply w-[250px] h-auto my-4 mx-auto;
  }
</style>
