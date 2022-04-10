<template>
  <template v-if="state.isLoading">Loading...</template>

  <template v-else>
    <div class="container">
      <div class="container__top">
        <div class="container__top_title">Recent Blog Articles</div>
        <div class="container__top_extra">
          <Select @selection-change="handleTakeChange" :selected="+state.take">
            <option selected="selected">5</option>
            <option>10</option>
            <option>20</option>
          </Select>
          <ButtonActionPrimary
            v-if="currentUser.username"
            label="Add Entry"
            @button-click="handleIsAdding"
          ></ButtonActionPrimary>
        </div>
      </div>

      <template v-if="!state.blogs.length">
        <Empty label="No blog articles to show." />
      </template>
      <template v-else>
        <div class="container__list">
          <div v-for="blog of state.blogs" :key="blog.id">
            <BlogCard :blog="blog" @blogDelete="onBlogDelete" />
          </div>
        </div>
      </template>
    </div>

    <Pagination
      :pages="state.totalPages"
      :show-numbers="true"
      :current-page="+state.currentPage"
      @next-page="handleNextPage"
      @prev-page="handlePrevPage"
      @go-to="handleGoTo"
    />
  </template>

  <Modal
    v-if="state.isAdding"
    @close-modal="state.isAdding = false"
    :allow-full="true"
    title="Adding a new entry"
  >
    <!--    <div class="border-b border-gray-200 pb-3">Adding a new entry</div>-->
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
          @button-click="state.isAdding = false"
          :disabled="state.isSending"
        ></ButtonActionCancel>
        <ButtonActionPrimary class="flex space-x-2" @button-click="handleOnSubmit">
          <div>Submit</div>
          <Spinner class="w-5" v-if="state.isSending" />
        </ButtonActionPrimary>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { computed, inject, onBeforeMount, reactive, ref, watch } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { storeToRefs } from 'pinia';
  import { getAllBlogs, createNewBlog, deleteBlogArticle } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import { IBlog } from '../../Interfaces/Blog/IBlog';
  import Button from '../../Components/Buttons/Button.vue';
  import BlogCard from '../../Components/Blog/BlogCard.vue';
  import Modal from '../../Components/Modal/Modal.vue';
  import TextEditor from '../../Components/Form/TextEditor.vue';
  import Empty from '../../Components/Util/Empty.vue';
  import Input from '../../Components/Form/Input.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../../Components/Buttons/ButtonActionCancel.vue';
  import Pagination from '../../Components/Pagination/Pagination.vue';
  import Select from '../../Components/Form/Select.vue';

  const { currentUser } = storeToRefs(useUser());

  const router = useRouter();
  const route = useRoute();
  const $bus = inject<IBus>('$bus');

  const state = reactive({
    blogs: <IBlog[]>[],
    title: '',
    content: '',
    isAdding: false,
    isSending: false,
    isLoading: true,
    currentPage: route.query.page ?? 1,
    totalPages: 1,
    take: localStorage.getItem('takeSize') ?? 5,
  });

  onBeforeMount(() => {
    localStorage.setItem('takeSize', state.take.toString());
    getBlogsHelper();
  });

  const take = computed(() => state.take);

  watch(take, () => {
    localStorage.setItem('takeSize', state.take.toString());
    getBlogsHelper();
  });

  function handleIsAdding() {
    state.isAdding = true;
  }

  function handleTitleInputChange(value: string) {
    state.title = value;
  }

  function handleContentInputChange(value: string) {
    state.content = value;
  }

  function handleOnSubmit() {
    if (state.title === '' || state.content === '') {
      return $bus?.emit('add-toast', 'Add a Title and Content.', 'error');
    }

    state.isSending = true;

    const body = {
      title: state.title,
      content: state.content,
    };

    createNewBlog(body)
      .then((d) => {
        $bus?.emit('add-toast', 'Blog article created.', 'success');
        state.isSending = false;
        router.push({ name: 'blogsArticle', params: { articleId: d.response._id } });
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        state.isSending = false;
      });
  }

  function onBlogDelete(articleId: number) {
    deleteBlogArticle(articleId)
      .then((res) => {
        state.blogs = state.blogs.filter((b: IBlog) => b.id !== articleId);
        $bus?.emit('add-toast', 'Blog article deleted with success.', 'success');
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function getBlogsHelper() {
    getAllBlogs(state.take, state.currentPage)
      .then((d) => {
        state.blogs = d.response;
        state.isLoading = false;
        state.totalPages = Math.ceil(state.blogs[0].count / +state.take);
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        state.isLoading = false;
      });
  }

  function handleTakeChange(value: any) {
    state.take = value;
  }

  function handleNextPage() {
    if (state.currentPage < state.totalPages) {
      state.currentPage = +state.currentPage + 1;
      router.push(`blogs?page=${state.currentPage}`);
    }
  }

  function handlePrevPage() {
    if (state.currentPage > 1) {
      state.currentPage = +state.currentPage - 1;
      router.push(`blogs?page=${state.currentPage}`);
    }
  }

  function handleGoTo(page: number) {
    if (state.currentPage !== page) {
      state.currentPage = page;
      router.push(`blogs?page=${state.currentPage}`);
    }
  }
</script>

<style scoped lang="scss">
  .container {
    @apply flex flex-col space-y-3;

    &__top {
      @apply flex justify-between border-b pb-3 px-3 items-center;

      &_title {
        @apply text-xl;
      }

      &_extra {
        @apply flex space-x-2;
      }
    }

    &__list {
      @apply flex flex-col space-y-4;
    }
  }
</style>
