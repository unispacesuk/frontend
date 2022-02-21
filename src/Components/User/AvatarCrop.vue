<template>
  <div class="w-[600px] h-auto relative">
    <img :src="avatar" alt="avatar to crop" />
    <div class="w-[600px] h-auto bg-black absolute top-0 z-10">
      <div class="w-10 h-10 bg-red-200 absolute top-0"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  avatar: String,
});
</script>
