<template>
  <div class="text_editor">
    <div class="flex space-x-2 pt-4 px-3 mb-3">
      <TextEditorButton @click="editor.chain().focus().toggleBold().run()" label="Bold" />
      <TextEditorButton @click="editor.chain().focus().toggleItalic().run()" label="Italic" />
      <TextEditorButton @click="editor.chain().toggleCodeBlock().run()" label="Code" />
      <TextEditorButton @click="editor.chain().toggleBlockquote().run()" label="Quote" />
    </div>
    <EditorContent :editor="editor" class="editor smooth-fast" />
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { EditorContent, useEditor } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  import TextEditorButton from './TextEditorButton.vue';

  const emits = defineEmits(['update-content']);

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: () => {
      onTextEditorUpdate(editor.value?.getHTML());
    },
  });

  // onBeforeMount(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.key === 'Enter') {
  //       editor.value?.chain().setHardBreak().run();
  //     }
  //   });
  // });

  function onTextEditorUpdate(content: string | undefined) {
    emits('update-content', content);
  }
</script>

<style lang="scss">
  .ProseMirror {
    @apply px-5 py-2 rounded-md outline-none border border-slate-300;

    &:focus {
      @apply outline-4 outline-$primary/40 ease-in-out duration-[35ms];
      outline-offset: 0;
    }

    &-trailingBreak {
      color: #0066cc;
    }
  }
</style>
