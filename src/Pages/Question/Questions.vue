<template>
  <!-- Top row (buttons) -->
  <div class="flex justify-between border-b border-slate-200 p-3">
    <div class="flex relative items-center">
      <SearchCircleIcon
        class="w-6 absolute top-1/2 -translate-y-1/2 left-2 text-gray-300"
        :class="state.isSearchFocused ? 'text-slate-500' : ''"
      />
      <form @submit.prevent="searchQuestions">
        <Input
          placeholder="search questions"
          class="pl-9"
          @input-focused="state.isSearchFocused = !state.isSearchFocused"
          @input-change="(v) => (state.searchQuery = v)"
          :value="state.searchQuery"
        />
      </form>
      <div v-if="state.isSearching" class="px-3">
        <ButtonActionSecondary @button-click="handleResetSearch">
          Clear Search
        </ButtonActionSecondary>
      </div>
      <!-- Dropdown / filters / tags sorted by most used -->
    </div>
    <div v-if="user.username">
      <ButtonActionPrimary
        label="Ask Question"
        @button-click="$router.push('/questions/ask')"
      ></ButtonActionPrimary>
    </div>
  </div>

  <div v-if="state.isLoading" class="space-y-2 mt-4">
    <QuestionListSkeleton />
    <QuestionListSkeleton />
    <QuestionListSkeleton />
  </div>

  <div class="p-3 space-y-4" v-if="!state.isLoading">
    <div v-if="!state.questions.length">
      <Empty label="No questions found." />
    </div>
    <div v-for="question of state.filteredQuestions" :key="question.id">
      <QuestionListItem :question="question" />
    </div>
  </div>

  <Pagination
    :pages="Math.ceil(state.questions.length / state.questionsByPage)"
    :show-numbers="true"
    :current-page="state.currentPage"
    @go-to="handleGoToPage"
    @next-page="handleNextPage"
    @prev-page="handlePreviousPage"
  />
</template>

<script setup lang="ts">
  import { computed, inject, nextTick, onBeforeMount, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { getAllQuestions } from '../../Services/Question/QuestionService';
  import { SearchCircleIcon } from '@heroicons/vue/solid';
  import { IQuestion } from '../../Interfaces/Question/IQuestion';
  import { IBus } from '../../Interfaces/IBus';
  import QuestionListItem from '../../Components/Question/QuestionListCard.vue';
  import Input from '../../Components/Form/Input.vue';
  import QuestionListSkeleton from '../../Components/Skeletons/QuestionListSkeleton.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import Pagination from '../../Components/Pagination/Pagination.vue';
  import Empty from '../../Components/Util/Empty.vue';

  const router = useRouter();
  const route = useRoute();
  const userStore = useUser();
  const { user } = storeToRefs(userStore);
  const $bus = inject<IBus>('$bus');

  const state: any = reactive({
    questions: <IQuestion>[],
    filteredQuestions: computed(() => {
      if (state.currentPage > 1) {
        return state.questions.slice(
          (state.currentPage - 1) * state.questionsByPage,
          state.currentPage * state.questionsByPage
        );
      }
      return state.questions.slice(0, state.questionsByPage);
    }),
    isLoading: true,
    searchQuery: '',
    isSearchFocused: false,
    isSearching: false,
    questionsByPage: 15,
    currentPage: 1,
  });

  onBeforeMount(() => {
    let query = '';
    if (route.query.keyword) {
      query = `keyword=${route.query.keyword}`;
      state.isSearching = true;
      nextTick(() => {
        state.searchQuery = route.query.keyword!.toString();
      });
    }
    if (route.query.tag) {
      query = `tag=${route.query.tag}`;
      state.isSearching = true;
    }
    getAllQuestions(query).then((d) => {
      state.questions = d.questions;
      state.isLoading = false;
    });
    $bus?.listen('question-delete-success', updateQuestions);
    $bus?.listen('question-delete-request', () => {
      state.isLoading = true;
    });
  });

  function updateQuestions() {
    getAllQuestions(' ').then((d) => {
      state.questions = d.questions;
      state.isLoading = false;
    });
  }

  function searchQuestions() {
    state.isLoading = true;
    router.push(`/questions/search?keyword=${state.searchQuery}`).then(() => {
      getAllQuestions(`keyword=${state.searchQuery}`)
        .then((d) => {
          state.questions = d.questions;
          state.isLoading = false;
          state.isSearching = true;
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  function handleResetSearch() {
    router.push('/questions');
  }

  function handleGoToPage(page: number) {
    state.currentPage = page;
  }

  function handleNextPage() {
    state.currentPage++;
  }

  function handlePreviousPage() {
    state.currentPage--;
  }

  defineExpose({
    state,
    searchQuestions,
    user,
  });
</script>
