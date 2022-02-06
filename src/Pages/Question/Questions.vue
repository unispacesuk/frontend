<template>
  <!-- TODO: Skeleton -->
  <div v-if="loading">... loading questions ...</div>

  <div v-if="!loading">
    <div>
      <!-- Top row (buttons) -->
      <div class="flex justify-between border-b border-slate-200 p-3">
        <div>
          <Input placeholder="search questions" />
          Dropdown / filters / tags sorted by most used
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
import { defineComponent, ref, onBeforeMount, watchEffect, reactive } from 'vue';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import { getAllQuestions } from '../../Services/Question/QuestionService';
import { IQuestion } from '../../Interfaces/Question/IQuestion';
import QuestionListItem from '../../Components/Question/QuestionListItem.vue';
import Input from '../../Components/Form/Input.vue';

export default defineComponent({
  name: 'Questions',
  components: { Input, QuestionListItem, ButtonPrimary },
  setup() {
    const questions = ref<IQuestion[]>();
    const loading = ref<boolean>(true);

    onBeforeMount(async () => {
      await getAllQuestions().then((d) => {
        questions.value = d.questions;
      });
      loading.value = false;
    });

    return {
      questions,
      loading,
    };
  },
});
</script>
