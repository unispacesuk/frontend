<template>
  <div
    id="back"
    class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex flex-col justify-evenly items-center z-[90] p-10"
  >
    <div
      class="relative overflow-y-scroll bg-white p-5 rounded-md shadow-sm z-[100] smooth"
      :class="{
        'min-h-[10px] max-h-[600px] w-full md:w-3/4 lg:w-2/4': !isLarge,
        'w-full h-full': allowFull && isLarge,
      }"
    >
      <div class="flex justify-between items-center border-b border-gray-200 pb-3">
        <div class="text-xl">
          {{ title }}
        </div>

        <div>
          <button @click="handleModalSize" v-if="allowFull" class="button-accent p-1 outline-none">
            <ArrowsExpandIcon class="w-5" />
          </button>
          <button @click="closeModal" class="button-accent p-1 outline-none">
            <XIcon class="w-5" />
          </button>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
  import { XIcon, ArrowsExpandIcon } from '@heroicons/vue/solid';

  const props = defineProps<{
    allowFull?: boolean;
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'close-modal'): void;
  }>();

  const isLarge = ref<boolean>(false);

  onBeforeMount(() => {
    addEventListener('keydown', handleKeyDown);
  });

  onBeforeUnmount(() => {
    removeEventListener('keydown', handleKeyDown);
  });

  function closeModal() {
    emit('close-modal');
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  function handleModalSize() {
    isLarge.value = !isLarge.value;
  }
</script>
