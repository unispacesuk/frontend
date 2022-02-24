<template>
  <textarea
    class="border border-slate-300 rounded-md px-5 py-2 outline-none resize-none focus:border-slate-500 shadow-sm"
    :placeholder="placeholder"
    :rows="rows"
    @keyup="emitValue"
    ref="content"
    :value="textContent"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface TextareaProps {
  placeholder: string;
  rows: number;
  textContent: any;
}

export default defineComponent({
  name: 'Textarea',
  setup(props: TextareaProps) {
    const placeholder = ref<string>(props.placeholder);
    const rows = ref<number>(props.rows);
    const content = ref<HTMLTextAreaElement>();

    return {
      placeholder,
      rows,
      content,
    };
  },
  props: ['placeholder', 'rows', 'textContent'],
  emits: ['textarea-change'],
  beforeMount() {
    this.$bus.listen('textarea-reset', this.reset);
  },
  beforeUnmount() {
    this.$bus.listen('textarea-reset', this.reset);
  },
  methods: {
    emitValue() {
      this.$emit('textarea-change', this.content!.value);
    },
    reset() {
      this.content!.value = '';
    }
  },
});
</script>
