<template>
  <div class="toggle" @click="handleToggleChange">
    <input type="checkbox" :checked="state.checked" />
    <span class="checkmark"></span>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const props = defineProps<{
    checked: boolean;
  }>();

  const emits = defineEmits<{
    (event: 'toggle-change', checked: boolean): void;
  }>();

  const state = reactive({
    checked: props.checked,
  });

  function handleToggleChange() {
    state.checked = !state.checked;
    emits('toggle-change', state.checked);
  }

  defineExpose({
    state,
    props,
  });
</script>

<style scoped lang="scss">
  .toggle {
    @apply relative inline-block w-[38px] h-[25px] rounded-full bg-gray-300;

    input + .checkmark {
      @apply absolute inset-0 w-[19px] h-[19px] rounded-full bg-white top-[3px] left-[3px];
      transition: all 0.2s ease-in-out;
    }

    input:checked + .checkmark {
      @apply bg-$action-active left-[16px];
    }
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
</style>
