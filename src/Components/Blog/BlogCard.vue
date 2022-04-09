<template>
  <div class="card smooth">
    <div class="card__top">
      <div class="card__top_title">
        <router-link :to="{ name: 'blogsArticle', params: { articleId: blog.id } }">
          {{ state.blog.title }}
        </router-link>
      </div>

      <div v-if="currentUser.username === blog.user.username" class="card__top_extra">
        <ButtonActionSecondary label="Edit" @button-click="handleEdit" />
        <ButtonActionSecondary label="Delete" @button-click="handleDelete" />
      </div>
    </div>
    <div class="flex py-3">
      <div class="card__left_content">
        <BlogCardUserInfo :user="state.blog.user" :votes="state.blog.votes" :article-id="blog.id" />
      </div>

      <div class="card__right_content" v-html="state.blog.content"></div>
    </div>
    <div class="card__bottom">
      <div>
        {{ new Date(blog.createdAt).toDateString() }}
      </div>
      <div class="card__bottom_right">
        <BlogRecentComents :article-id="state.blog.id" />
        <ButtonActionSecondary
          label="Read More"
          @button-click="handleReadMore"
        ></ButtonActionSecondary>
      </div>
    </div>
    <BlogEditDialog
      :blog="state.blog"
      v-if="state.isEditing"
      @closeModal="handleEditClose"
      @editCancel="handleEditClose"
      @editSubmit="handleEditSubmit"
    />

    <BlogDeleteDialog
      v-if="state.isDeleting"
      @closeModal="handleDeleteClose"
      @cancelDelete="handleDeleteClose"
      @submitDelete="handleDeleteSubmit"
    />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { inject, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { updateBlogArticle } from '../../Services/Blog/BlogService';
  import { IBlog } from '../../Interfaces/Blog/IBlog';
  import { IBus } from '../../Interfaces/IBus';
  import BlogCardUserInfo from './BlogCardUserInfo.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import BlogCardContent from './BlogCardContent.vue';
  import BlogEditDialog from './BlogEditDialog.vue';
  import BlogDeleteDialog from './BlogDeleteDialog.vue';
  import BlogRecentComents from './BlogRecentComents.vue';

  const { currentUser } = storeToRefs(useUser());
  const router = useRouter();

  const props = defineProps<{
    blog: IBlog;
  }>();

  const emits = defineEmits<{
    (event: 'blog-delete', articleId: number): void;
  }>();

  const state = reactive({
    blog: props.blog,
    isEditing: false,
    isDeleting: false,
  });

  const $bus = inject<IBus>('$bus');

  function handleReadMore() {
    router.push({
      name: 'blogsArticle',
      params: {
        articleId: props.blog.id,
      },
    });
  }

  function handleEdit() {
    return (state.isEditing = true);
  }

  function handleEditClose() {
    return (state.isEditing = false);
  }

  // TODO: maybe on the update can happen on the dialog component itself?
  // then send back en event with the new data once the update is finished to refresh the component?
  function handleEditSubmit({ title, content }: any) {
    updateBlogArticle(props.blog.id, { title, content })
      .then((res) => {
        $bus?.emit('add-toast', 'Blog article edited with success.', 'success');
        state.isEditing = false;
        state.blog.title = title;
        state.blog.content = content;
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function handleDelete() {
    return (state.isDeleting = true);
  }

  function handleDeleteClose() {
    return (state.isDeleting = false);
  }

  function handleDeleteSubmit() {
    emits('blog-delete', props.blog.id);
  }
</script>

<style scoped lang="scss">
  .card {
    @apply w-full border border-gray-200 rounded-md p-3 hover:shadow-md;

    &__top {
      @apply flex justify-between items-center pb-3 px-5 border-b border-gray-200;

      &_title {
        @apply text-2xl;
      }

      &_extra {
        @apply flex space-x-2;
      }
    }

    &__left_content {
      @apply w-1/4;
    }

    &__right_content {
      @apply w-3/4 pl-5 max-h-[250px] overflow-hidden text-ellipsis;
    }

    &__bottom {
      @apply flex justify-between items-center border-t border-gray-200 px-5 pt-3 text-sm text-gray-500;

      &_right {
        @apply flex space-x-5 items-center;
      }
    }
  }
</style>
