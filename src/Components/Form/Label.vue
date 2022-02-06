<template>
  <label class="pl-3">{{ label }}</label>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface LabelProps {
  label: string;
}

export default defineComponent({
  name: 'Label',
  props: ['label'],
  setup(props: LabelProps) {
    const label = ref<string>(props.label);

    return {
      label,
    };
  },
});
</script>
