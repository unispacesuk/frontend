<template>
  <div>
    <!-- Top row (buttons) -->
    <div class="flex justify-between border-b border-slate-200 p-3">
      <div class="flex relative">
        <SearchCircleIcon
          class="w-6 absolute top-1/2 -translate-y-1/2 left-2 text-gray-300"
          :class="isSearchFocused ? 'text-slate-500' : ''"
        />
        <form @submit.prevent="searchQuestions">
          <Input
            placeholder="search questions"
            class="pl-9"
            @input-focused="isSearchFocused = !isSearchFocused"
            @input-change="(v) => (searchQuery = v)"
          />
        </form>
        <!-- Dropdown / filters / tags sorted by most used -->
      </div>
      <div v-if="user.username">
        <ButtonPrimary label="Ask" @click="$router.push('/questions/ask')" />
      </div>
    </div>

    <div v-if="loading" class="space-y-2 mt-4">
      <QuestionListSkeleton />
      <QuestionListSkeleton />
      <QuestionListSkeleton />
    </div>

    <div class="p-3 space-y-4" v-if="!loading">
      <div v-if="questions.length === 0">No questions here.</div>
      <div v-for="question of questions" :key="question.id">
        <QuestionListItem :question="question" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeMount, ref, watch, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import { getAllQuestions } from '../../Services/Question/QuestionService';
import { IQuestion } from '../../Interfaces/Question/IQuestion';
import QuestionListItem from '../../Components/Question/QuestionListCard.vue';
import Input from '../../Components/Form/Input.vue';
import { SearchCircleIcon } from '@heroicons/vue/solid';
import QuestionListSkeleton from '../../Components/Skeletons/QuestionListSkeleton.vue';
import { router } from '../../Router';
import { useUser } from '../../Stores/UserStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Questions',
  components: { QuestionListSkeleton, Input, QuestionListItem, ButtonPrimary, SearchCircleIcon },
  data() {
    return {
      isSearchFocused: false,
    };
  },
  setup() {
    const questions = ref<IQuestion[]>([]);
    const loading = ref<boolean>(true);
    const $bus: any = inject('$bus');
    const searchQuery = ref<string>('');
    const route = useRoute();
    const userStore = useUser();
    const { user } = storeToRefs(userStore);

    onBeforeMount(() => {
      let query = '';
      if (route.query.keyword) {
        query = `keyword=${route.query.keyword}`;
      }
      if (route.query.tag) {
        query = `tag=${route.query.tag}`;
      }
      getAllQuestions(query).then((d) => {
        questions.value = d.questions;
        loading.value = false;
      });
      $bus.listen('question-delete-success', updateQuestions);
      $bus.listen('question-delete-request', () => (loading.value = true));
    });

    const updateQuestions = () => {
      getAllQuestions().then((d) => {
        questions.value = d.questions;
        loading.value = false;
      });
    };

    const searchQuestions = () => {
      loading.value = true;
      router.push(`/questions/search?keyword=${searchQuery.value}`).then(() => {
        getAllQuestions(`keyword=${searchQuery.value}`).then((d) => {
          questions.value = d.questions;
          loading.value = false;
        }).catch((e) => {
          console.log(e);
        });
      });
    };

    return {
      questions,
      loading,
      searchQuestions,
      searchQuery,
      user,
    };
  },
});
</script>
