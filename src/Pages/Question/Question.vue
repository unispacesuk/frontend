<template>
  <div v-if="loadingQuestion">... loading question ...</div>
  <div v-if="!loadingQuestion">
    <div class="pb-2 space-y-2 border-b border-gray-200">
      <div class="flex space-x-2">
        <div class="w-1/4 p-3 border-r border-gray-200">user info</div>
        <div class="w-full p-3">
          <div>{{ question.title }}</div>
          <div>
            {{ question.description }}
          </div>
          <div>
            {{ question.tags }}
          </div>
          <div>
            {{ question.createdAt }}
          </div>
        </div>
      </div>
      <div v-if="user.username" class="w-full flex justify-end">
        <ButtonPrimary class="cursor-pointer w-auto" @click="showReplyForm = true"
          >reply
        </ButtonPrimary>
      </div>
    </div>
  </div>

  <div v-if="loadingAnswers">... loading answers ...</div>
  <div v-if="!loadingAnswers">
    <div class="py-2 flex flex-col" v-for="answer of answers">
      <div
        class="cursor-pointer"
        @click="
          selectedAnswer = answer;
          showAnswer = true;
        "
      >
        {{ answer.content }}
      </div>
      <div class="text-sm text-gray-500">{{ answer.createdAt }}</div>
    </div>
  </div>

  <Modal v-if="showReplyForm" @close-modal="showReplyForm = false">
    <form @submit.prevent>
      <div class="pl-3 text-xl pb-3">Replying to: {{ question.title }}</div>
      <Textarea class="w-full" rows="10" @textarea-change="(v) => (replyContent = v)" />
      <ButtonPlain class="flex items-center" type="submit" @click="doSubmitAnswer"
        >Send <Spinner v-if="submittingAnswer" class="w-5 ml-2"
      /></ButtonPlain>
    </form>
  </Modal>

  <Modal v-if="showAnswer" @close-modal="showAnswer = false">
    {{ selectedAnswer }}
  </Modal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, inject } from 'vue';
import { getQuestion } from '../../Services/Question/QuestionService';
import { IAnswer, IQuestion } from '../../Interfaces/Question/IQuestion';
import { useRoute } from 'vue-router';
import { getAnswers, submitAnswer } from '../../Services/Question/AnswerService';
import Modal from '../../Components/Modal/Modal.vue';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import Textarea from '../../Components/Form/Textarea.vue';
import Spinner from '../../Icons/Util/Spinner.vue';
import ButtonPlain from '../../Components/Buttons/ButtonPlain.vue';
import { useUser } from '../../Stores/UserStore';
import { storeToRefs } from 'pinia';

// const $bus: any = inject('$bus');
const route = useRoute();
const question = ref<IQuestion>({});
const answers = ref<IAnswer[]>([]);
const selectedAnswer = ref<IAnswer>({});
const showAnswer = ref<boolean>(false);
const showReplyForm = ref<boolean>(false);
const replyContent = ref<string>('');

const loadingQuestion = ref<boolean>(true);
const loadingAnswers = ref<boolean>(true);
const submittingAnswer = ref<boolean>(false);

const userStore = useUser();
const { user } = storeToRefs(userStore);

onBeforeMount(async () => {
  getQuestion(<string>route.params.id).then((d) => {
    question.value = d.question;
    loadingQuestion.value = false;
    getAnswers(<string>route.params.id).then((d) => {
      loadingAnswers.value = false;
      answers.value = d.answers;
    });
  });
});

function doSubmitAnswer() {
  submittingAnswer.value = true;
  const body = {
    content: replyContent.value,
  };

  submitAnswer(<string>route.params.id, body).then((d) => {
    answers.value.unshift(d.answer);
    showReplyForm.value = false;
    submittingAnswer.value = false;
  });
}
</script>
