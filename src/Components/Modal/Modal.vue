<template>
  <div
    id="back"
    class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex flex-col justify-evenly items-center z-[90]"
  >
    <div class="relative w-2/4 min-h-[10px] max-h-[600px] my-10 overflow-y-scroll bg-white p-5 rounded-md shadow-sm z-[100]">
      <button @click="closeModal" class="absolute top-2 right-2 button-accent p-1 outline-none">
        <Cross class="w-5" />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount } from 'vue';
  import Cross from '../../Icons/Util/Cross.vue';

  const emit = defineEmits<{
    (e: 'close-modal'): void;
  }>();

  onBeforeMount(() => {
    addEventListener('keydown', handleKeyDown);
    addEventListener('click', handleClick);
  });

  onBeforeUnmount(() => {
    removeEventListener('keydown', handleKeyDown);
    removeEventListener('click', handleClick);
  });

  function closeModal() {
    emit('close-modal');
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  function handleClick(e: MouseEvent) {
    if ((e.target as HTMLElement).id === 'back') {
      closeModal();
    }
  }
</script>
