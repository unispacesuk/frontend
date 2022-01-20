<template>
  <div
    class="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex flex-col justify-evenly items-center"
  >
    <div class="relative w-2/4 h-auto bg-white p-5 rounded-md shadow-sm">
      <button @click="closeModal" class="absolute top-2 right-2 button-accent p-1">
        <Cross class="w-5" />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cross from '../../Icons/Cross.vue';

export default defineComponent({
  name: 'Modal',
  components: { Cross },
  emits: ['close-modal'],
  data() {
    return {
      name: 'Ricardo',
      age: 28,
    };
  },
  beforeMount() {
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
