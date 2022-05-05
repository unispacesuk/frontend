<template>
  <div class="card">
    <div class="flex space-x-4 items-center">
      <UserAvatar class="shrink-0" :user="article.user" size="sm" />
      <div class="overflow-hidden">
        <div class="card__title">{{ state.article.title }}</div>
        <div class="card__date">{{ new Date(state.article.created_at).toDateString() }}</div>
      </div>
    </div>
    <div class="actions">
      <ButtonActionSecondary @button-click="onClickVisitArticle"> Read </ButtonActionSecondary>
      <ButtonActionCancel @button-click="onClickRemove">
        <TrashIcon class="w-5" />
      </ButtonActionCancel>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed, reactive } from 'vue';
  import { TrashIcon } from '@heroicons/vue/solid';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import UserAvatar from '../User/UserAvatar.vue';
  import { deleteFromReadLaterList } from '../../Services/User/UserService';

  const router = useRouter();

  const props = defineProps<{
    article: any;
  }>();

  const state = reactive({
    article: computed(() => props.article),
  });

  const emits = defineEmits<{
    (event: 'action:remove-article', data: number): void;
  }>();

  function onClickVisitArticle() {
    router.push(`/blog/article/${state.article.blog_post}`);
  }

  function onClickRemove() {
    deleteFromReadLaterList(state.article.blog_post)
      .then(() => {
        emits('action:remove-article', state.article.blog_post);
      })
      .catch(() => {});
  }

  defineExpose({ state, onClickVisitArticle, onClickRemove });
</script>

<style scoped lang="scss">
  .card {
    @apply py-3 hover:bg-gray-100 px-3 rounded-md flex items-center justify-between border border-gray-200;

    &__title {
      @apply pr-3 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis;
    }

    &__date {
      @apply text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis;
    }

    .actions {
      @apply flex space-x-2 shrink-0;
    }
  }
</style>
