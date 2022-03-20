<template>
  <div class="container">
    <div class="container__top">
      <Button type="success" @button-click="handleIsAdding">Add Entry</Button>
    </div>

    <div class="container__list">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  </div>

  <Modal v-if="isAdding" @close-modal="isAdding = false" :allow-full="true">
    <div class="border-b border-gray-200 pb-3">Adding a new entry</div>
    <div>
      <TextEditor />

      <div class="flex space-x-2 justify-end mt-3">
        <Button @click="isAdding = false" type="error">Cancel</Button>
        <Button type="success">Submit</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Button from '../../Components/Buttons/Button.vue';
  import BlogCard from '../../Components/Blog/BlogCard.vue';
  import Modal from '../../Components/Modal/Modal.vue';
  import TextEditor from '../../Components/Form/TextEditor.vue';

  const isAdding = ref<boolean>(false);

  function handleIsAdding() {
    isAdding.value = true;
  }
</script>

<style scoped lang="scss">
  .container {
    @apply flex flex-col space-y-3;

    &__top {
      @apply flex justify-end border-b;
    }

    &__list {
      @apply flex flex-col space-y-4;
    }
  }
</style>
