<template>
  <Modal title="Editing Blog Article" :allow-full="true">
    <div class="modal_row pt-3">
      <Label label="Title" />
      <Input :input-value="blog.title" @input-change="handleInputChange" />
    </div>
    <div class="modal_row">
      <TextEditor :content="blog.content" @update-content="handleContentChange" />
    </div>
    <div class="modal_bottom">
      <ButtonActionCancel
        v-if="!state.isEditing"
        label="Cancel"
        @button-click="emits('edit-cancel')"
      />
      <ButtonActionPrimary @button-click="handleEditSubmit" class="flex space-x-2">
        <div>Submit</div>
        <Spinner class="w-5" v-if="state.isEditing" />
      </ButtonActionPrimary>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../Modal/Modal.vue';
  import Input from '../Form/Input.vue';
  import Label from '../Form/Label.vue';
  import TextEditor from '../Form/TextEditor.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const props = defineProps<{
    blog: {
      title: string;
      content: string;
    };
  }>();

  const emits = defineEmits<{
    (event: 'edit-cancel'): void;
    (event: 'edit-submit', data: any): void;
  }>();

  const state = reactive({
    newTitle: props.blog.title,
    newContent: props.blog.content,
    isEditing: false,
  });

  const $bus = inject<IBus>('$bus');

  function handleInputChange(value: string) {
    state.newTitle = value;
  }

  function handleContentChange(value: string) {
    state.newContent = value;
  }

  function handleEditSubmit() {
    if (state.newTitle === '' || state.newContent === '<p></p>') {
      $bus?.emit('add-toast', 'You cannot submit empty fields.', 'error');
      return;
    }

    state.isEditing = true;

    const data = {
      title: state.newTitle,
      content: state.newContent,
    };

    return emits('edit-submit', data);
  }
</script>

<style scoped lang="scss">
  .modal_title {
    @apply pb-3 border-b border-gray-200;
  }

  .modal_row {
    @apply flex flex-col;
  }

  .modal_bottom {
    @apply flex justify-end space-x-2 pt-3;
  }
</style>
