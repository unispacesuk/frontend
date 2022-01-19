<template>
  <div
    class="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex flex-col justify-evenly items-center"
  >
    <div class="w-2/4 h-auto bg-white p-5 rounded-md shadow-sm">
      <button class="bg-gray-200 px-4 py-2 rounded-md active:bg-gray-300" @click="click">
        Click ME!</button
      ><br /><br />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  data() {
    return {
      name: 'Ricardo',
      age: 28,
    };
  },
  methods: {
    click() {
      this.$bus.publish('heythere', this.name, this.age);
    },
  },
});
</script>
