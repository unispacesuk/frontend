<template>
  <div
    class="bg-blue-200 px-4 py-1 rounded-md shadow text-gray-900 hover:bg-blue-300 smooth cursor-pointer"
  >
    {{ tag }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tag',
  props: ['tag'],
});
</script>
