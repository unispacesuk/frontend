<template>
  <input
    type="text"
    class="border border-slate-300 rounded-md px-5 py-2 shadow-sm focus:outline outline-4 focus:outline-$primary/40 smooth-fast"
    :placeholder="placeholder"
    v-model="value"
    @keyup="emitValue"
    @focusin="$emit('input-focused')"
    @focusout="$emit('input-focused')"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'Input',
    data() {
      return {
        value: this.inputValue ?? '',
      };
    },
    props: ['placeholder', 'inputValue'],
    setup(props: any) {
      const placeholder: string = ref(props.placeholder);
      const inputValue: string = ref(props.inputValue);
      // const disabled: boolean = ref(props.isEditingEmail);

      return {
        placeholder,
        inputValue,
        // disabled,
      };
    },
    emits: ['input-change', 'input-focused'],
    beforeMount() {
      this.$bus.listen('input-reset', this.reset);
    },
    beforeUnmount() {
      this.$bus.listen('input-reset', this.reset);
    },
    methods: {
      emitValue() {
        this.$emit('input-change', this.value);
      },
      reset() {
        this.value = '';
      },
    },
  });
</script>

<style scoped lang="scss">
  input:disabled {
    @apply text-gray-500;
  }
</style>
