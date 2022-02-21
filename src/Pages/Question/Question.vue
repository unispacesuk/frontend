<template>
  <div v-if="loadingQuestion">... loading question ...</div>
  <div v-if="!loadingQuestion">
    <div class="pb-2 space-y-2 border-b border-gray-200">
      <div class="flex space-x-2">
        <div class="w-1/4 p-3 border-r border-gray-200">
          <!--          <QuestionUserInfo :user-id="question.userId" />-->
          avatar here.
        </div>
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
      <div v-if="user.username" class="w-full flex justify-end space-x-5">
        <div class="flex items-center space-x-2 text-slate-400 text-sm">
          <button
            class="flex cursor-pointer hover:text-slate-700 smooth outline-none"
            :class="{ 'text-red-500': voted && type === 'up' }"
            @click="doUpvote"
            :disabled="user.id === question.userId || voted"
          >
            <PlusIcon class="w-2" />
            <PlusIcon class="w-2" />
          </button>
          <Transition name="toast">
            <div class="smooth" :class="{ 'text-red-500 smooth': changing }">
              {{ votes }}
            </div>
          </Transition>
          <button
            class="flex cursor-pointer hover:text-slate-700 smooth outline-none"
            :class="{ 'text-red-500': voted && type === 'down' }"
            @click="doDownvote"
            :disabled="user.id === question.userId || voted"
          >
            <MinusIcon class="w-2" />
            <MinusIcon class="w-2" />
          </button>
        </div>
        <ButtonPrimary class="cursor-pointer w-auto" @click="showReplyForm = true"
          >reply
        </ButtonPrimary>
      </div>
    </div>
  </div>

  <div v-if="loadingAnswers">... loading answers ...</div>
  <div v-if="!loadingAnswers">
    <div class="py-3 pl-5">Answers: {{ question.answers }}</div>
    <div class="py-2 flex flex-col" v-for="answer of answers">
      <Answer :answer="answer" :owner="question.userId" />
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

  <!--  <Modal v-if="showAnswer" @close-modal="showAnswer = false">-->
  <!--    {{ selectedAnswer }}-->
  <!--  </Modal>-->
</template>

<script setup lang="ts">
import { onBeforeMount, ref, inject, reactive, watch } from 'vue';
import { getQuestion, submitVote, getMyVote } from '../../Services/Question/QuestionService';
import { IAnswer, IQuestion } from '../../Interfaces/Question/IQuestion';
import { useRoute } from 'vue-router';
import { getAnswers, submitAnswer } from '../../Services/Question/AnswerService';
import Modal from '../../Components/Modal/Modal.vue';
import ButtonPrimary from '../../Components/Buttons/ButtonPrimary.vue';
import Textarea from '../../Components/Form/Textarea.vue';
import Spinner from '../../Icons/Util/Spinner.vue';
import ButtonPlain from '../../Components/Buttons/ButtonPlain.vue';
import { useUser } from '../../Stores/UserStore';
import { useQuestion } from '../../Stores/QuestionStore';
import { storeToRefs } from 'pinia';
import { PlusIcon, MinusIcon } from '@heroicons/vue/solid';
import Answer from '../../Components/Question/Answer.vue';

// const $bus: any = inject('$bus');
const route = useRoute();
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
const questionStore = useQuestion();
const { question, votes, voted, type } = storeToRefs(questionStore);

const changing = ref<boolean>(false); // refers to changing the vote value

onBeforeMount(async () => {
  getQuestion(<string>route.params.id).then((d) => {
    question.value = d.question;
    votes.value = d.question.votes;
    loadingQuestion.value = false;
    doGetMyVote();
    getAnswers(<string>route.params.id).then((d) => {
      answers.value = d.answers;
      loadingAnswers.value = false;
    });
  });
});

interface IVote {
  type: string;
}
function doGetMyVote() {
  if (user.value.username) {
    getMyVote(question.value.id!.toString()).then((d) => {
      if (d !== null) {
        questionStore.setVoted(true);
        questionStore.setType(<string>d.type);
      }
    });
  }
}

function doSubmitAnswer() {
  submittingAnswer.value = true;
  const body = {
    content: replyContent.value,
  };

  submitAnswer(<string>route.params.id, body).then((d) => {
    answers.value.push(d.answer);
    showReplyForm.value = false;
    submittingAnswer.value = false;
  });
}

function doUpvote() {
  submitVote(question.value.id!.toString(), 'up')
    .then(() => {
      questionStore.vote('up');
      changing.value = true;
      setTimeout(() => {
        changing.value = false;
      }, 500);
      questionStore.setVoted(true);
      questionStore.setType('up');
    })
    .catch((e) => {
      if (e.response) {
        console.log(e);
      }
    });
}

function doDownvote() {
  submitVote(question.value.id!.toString(), 'down')
    .then(() => {
      questionStore.vote('down');
      changing.value = true;
      setTimeout(() => {
        changing.value = false;
      }, 500);
      questionStore.setVoted(true);
      questionStore.setType('down');
    })
    .catch((e) => {
      if (e.response) {
        console.log(e);
      }
    });
}
</script>
