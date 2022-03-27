<template>
  <div class="container">
    <div class="container__top">
      <!--      <Button type="success" @button-click="handleIsAdding">Add Entry</Button>-->
      <ButtonActionPrimary label="Add Entry" @button-click="handleIsAdding"></ButtonActionPrimary>
    </div>

    <template v-if="!blogs.length">
      <Empty label="No blog articles to show." />
    </template>
    <template v-else>
      <div class="container__list">
        <div v-for="blog of blogs" :key="blog.id">
          <BlogCard :blog="blog" />
        </div>
      </div>
    </template>
  </div>

  <Modal v-if="isAdding" @close-modal="isAdding = false" :allow-full="true">
    <div class="border-b border-gray-200 pb-3">Adding a new entry</div>
    <div class="pt-3">
      <div>
        <div class="px-5">Title</div>
        <Input
          @input-change="handleTitleInputChange"
          class="w-full"
          placeholder="Blog article title"
        />
      </div>
      <TextEditor @update-content="handleContentInputChange" />

      <div class="flex space-x-2 justify-end mt-3">
        <ButtonActionCancel
          label="Cancel"
          @button-click="isAdding = false"
          :disabled="isSending"
        ></ButtonActionCancel>
        <ButtonActionPrimary class="flex space-x-2" @button-click="handleOnSubmit">
          <div>Submit</div>
          <Spinner class="w-5" v-if="isSending" />
        </ButtonActionPrimary>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { inject, onBeforeMount, ref } from 'vue';
  import { getAllBlogs, createNewBlog } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import Button from '../../Components/Buttons/Button.vue';
  import BlogCard from '../../Components/Blog/BlogCard.vue';
  import Modal from '../../Components/Modal/Modal.vue';
  import TextEditor from '../../Components/Form/TextEditor.vue';
  import Empty from '../../Components/Util/Empty.vue';
  import Input from '../../Components/Form/Input.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../../Components/Buttons/ButtonActionCancel.vue';

  const router = useRouter();
  const $bus = inject<IBus>('$bus');
  const isAdding = ref<boolean>(false);
  const blogs = ref<[]>([]);

  const title = ref<string>('');
  const content = ref<string>('');
  const isSending = ref<boolean>(false);

  onBeforeMount(() => {
    getAllBlogs()
      .then((d) => {
        blogs.value = d.response;
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  });

  function handleIsAdding() {
    isAdding.value = true;
  }

  function handleTitleInputChange(value: string) {
    title.value = value;
  }

  function handleContentInputChange(value: string) {
    content.value = value;
  }

  function handleOnSubmit() {
    if (title.value === '' || content.value === '') {
      return $bus?.emit('add-toast', 'Add a Title and Content.', 'error');
    }

    isSending.value = true;

    const body = {
      title: title.value,
      content: content.value,
    };

    createNewBlog(body)
      .then((d) => {
        $bus?.emit('add-toast', 'Blog article created.', 'success');
        isSending.value = false;
        router.push({ name: 'blogsArticle', params: { articleId: d.response._id } });
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        isSending.value = false;
      });
  }
</script>

<style scoped lang="scss">
  .container {
    @apply flex flex-col space-y-3;

    &__top {
      @apply flex justify-end border-b pb-3;
    }

    &__list {
      @apply flex flex-col space-y-4;
    }
  }
</style>
