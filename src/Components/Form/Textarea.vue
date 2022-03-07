<template>
  <!--  <textarea-->
  <!--    class="border border-slate-300 rounded-md px-5 py-2 outline-none resize-none focus:border-slate-500 shadow-sm"-->
  <!--    :placeholder="placeholder"-->
  <!--    :rows="rows"-->
  <!--    @keyup="emitValue"-->
  <!--    ref="content"-->
  <!--    :value="textContent"-->
  <!--  ></textarea>-->
  <div class="mb-3">
    <QuillEditor
      v-model:content="content"
      ref="editor"
      content-type="html"
      :options="options"
      @keyup="emitValue"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill';

  interface TextareaProps {
    placeholder: string;
    rows: number;
    textContent: any;
  }

  export default defineComponent({
    name: 'Textarea',
    components: {
      QuillEditor,
    },
    setup(props: TextareaProps) {
      const content = ref<string>(props.textContent ?? '');

      setTimeout(() => {
        content.value = 'hey there';
      }, 3000);

      const options = {
        modules: {
          toolbar: ['bold', 'italic', 'underline', 'code'],
        },
        placeholder: props.placeholder ?? '',
        theme: 'snow',
      };

      return {
        content,
        options,
      };
    },
    props: ['placeholder', 'rows', 'textContent', 'height'],
    emits: ['textarea-change'],
    data() {
      return {
        quillHeight: `h-[${this.height}px]`,
      };
    },
    beforeMount() {
      this.$bus.listen('textarea-reset', this.reset);
    },
    beforeUnmount() {
      this.$bus.listen('textarea-reset', this.reset);
    },
    methods: {
      emitValue() {
        this.$emit('textarea-change', this.content);
      },
      reset() {
        // @ts-ignore
        this.$refs.editor.setHTML('');
      },
    },
  });
</script>
