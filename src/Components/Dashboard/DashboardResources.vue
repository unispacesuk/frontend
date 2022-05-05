<template>
  <div class="resource-upload-form">
    <div>Upload a new resource file.</div>
    <ButtonActionSecondary @button-click="onUploadClick"> Upload </ButtonActionSecondary>
  </div>

  <template v-if="!state.files.length">
    <Empty label="You haven't shared any files yet." />
  </template>

  <template v-else>
    <div class="resources-list">
      <div v-for="(file, index) of state.files" :key="index">
        <DashboardResourcesItem :file="file" @action:delete="onFileDelete" />
      </div>
    </div>
  </template>

  <DashboardResourcesUploadDialog
    v-if="state.isUploading"
    @action:close="onUploadClose"
    @action:uploaded="handleGetResources"
  />
</template>

<script setup lang="ts">
  import { reactive, onBeforeMount } from 'vue';
  import { getResourceFiles } from '../../Services/Resources/ResourcesService';
  import Empty from '../Util/Empty.vue';
  import DashboardResourcesItem from './DashboardResourcesItem.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import DashboardResourcesUploadDialog from './DashboardResourcesUploadDialog.vue';

  const state = reactive({
    files: [],
    isUploading: false,
  });

  onBeforeMount(() => {
    handleGetResources();
  });

  function onUploadClick() {
    return (state.isUploading = true);
  }

  function onUploadClose() {
    return (state.isUploading = false);
  }

  function handleGetResources() {
    getResourceFiles()
      .then((data) => {
        state.files = data.response;
        onUploadClose();
      })
      .catch(() => {});
  }

  function onFileDelete(fileId: string) {
    state.files = state.files.filter((file: any) => file._id !== fileId);
  }

  defineExpose({ state, onUploadClick, onUploadClose, handleGetResources, onFileDelete });
</script>

<style scoped lang="scss">
  .resource-upload-form {
    @apply p-3 flex space-x-2 items-center mb-4;
  }

  .resources-list {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
  }
</style>
