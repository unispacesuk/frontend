<template>
  <div v-if="loading" class="space-y-2">
    <QuestionListSkeleton />
    <QuestionListSkeleton />
    <QuestionListSkeleton />
  </div>

  <div v-if="!loading">
    <div v-if="questions.length === 0">No questions here.</div>
    <div>
      <!-- Top row (buttons) -->
      <div class="flex justify-between border-b border-slate-200 p-3">
        <div class="flex relative">
          <SearchCircleIcon
            class="w-6 absolute top-1/2 -translate-y-1/2 left-2 text-gray-300"
            :class="isSearchFocused ? 'text-slate-500' : ''"
          />
          <Input
            placeholder="search questions"
            class="pl-9"
            @input-focused="isSearchFocused = !isSearchFocused"
          />
          <!-- Dropdown / filters / tags sorted by most used -->
        </div>
        <div>
          <ButtonPrimary label="Ask" @click="$router.push('/questions/ask')" />
        </div>
      </div>
      <div class="p-3 space-y-4">
        <div v-for="question of questions" :key="question.id">
          <QuestionListItem :question="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import { getAllQuestions } from '../../Services/Question/QuestionService';
import { IQuestion } from '../../Interfaces/Question/IQuestion';
import QuestionListItem from '../../Components/Question/QuestionListItem.vue';
import Input from '../../Components/Form/Input.vue';
import { SearchCircleIcon } from '@heroicons/vue/solid';
import QuestionListSkeleton from '../../Components/Skeletons/QuestionListSkeleton.vue';

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

    // get the routes full path and watch for changes...
    const route = useRoute();
    watch(
      () => route.query.tag,
      () => {
        loading.value = true;
        // this may cause problems... keep an eye open here!
        if (route.query.tag !== 'undefined') {
          getAllQuestions(`tag=${route.query.tag}`).then((d) => {
            questions.value = d.questions;
            loading.value = false;
          });
        }
      }
    );

    onBeforeMount(() => {
      getAllQuestions().then((d) => {
        questions.value = d.questions;
        loading.value = false;
      });
    });

    return {
      questions,
      loading,
    };
  },
});
</script>
