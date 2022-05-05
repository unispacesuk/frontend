<template>
  <Modal
    class="resource-upload-dialog"
    title="Upload a new resource file"
    @close-modal="onUploadClose"
  >
    <div class="form-row">
      <Label label="File Name" />
      <Input @input-change="onFileNameChange" />
    </div>
    <div class="form-row">
      <Label label="File" />
      <input type="file" id="resource-file" @change="onFileSelect($event.target.files)" />
    </div>

    <div class="actions">
      <ButtonActionCancel @button-click="onUploadClose" :disabled="state.isUploading">
        Cancel
      </ButtonActionCancel>
      <ButtonActionPrimary
        class="flex space-x-2"
        @button-click="onClickUpload"
        :disabled="state.isUploading"
      >
        <div>Upload</div>
        <Spinner v-if="state.isUploading" class="w-5" />
      </ButtonActionPrimary>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { reactive, inject } from 'vue';
  import { uploadResourceFile } from '../../Services/Resources/ResourcesService';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../Modal/Modal.vue';
  import Input from '../Form/Input.vue';
  import Label from '../Form/Label.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const $bus = inject<IBus>('$bus');

  const state = reactive({
    fileName: '',
    selectedFile: null,
    isUploading: false,
  });

  const emits = defineEmits<{
    (event: 'action:close'): void;
    (event: 'action:uploaded'): void;
  }>();

  function onFileNameChange(value: any) {
    state.fileName = value;
  }

  function onFileSelect(files: any) {
    console.log(files);
    state.selectedFile = files[0];
  }

  function onUploadClose() {
    emits('action:close');
  }

  function onClickUpload() {
    if (!state.selectedFile || !state.fileName) return;

    state.isUploading = true;
    const formData = new FormData();
    formData.append('resource-file', state.selectedFile);
    formData.append('file-name', state.fileName);

    uploadResourceFile(formData)
      .then(() => {
        state.isUploading = false;
        $bus?.emit('add-toast', 'New resource file uploaded.', 'success');
        emits('action:uploaded');
      })
      .catch(() => {});
  }

  defineExpose({ state, onFileNameChange, onFileSelect, onUploadClose });
</script>

<style scoped lang="scss">
  .resource-upload-dialog {
    .form-row {
      @apply flex flex-col mt-3;
    }

    .actions {
      @apply flex space-x-2 mt-3 justify-end;
    }
  }
</style>
