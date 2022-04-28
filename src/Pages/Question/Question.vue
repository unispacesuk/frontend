<template>
  <div v-if="loadingQuestion">... loading question ...</div>
  <div v-if="!loadingQuestion">
    <div class="pb-2 space-y-2 border-b border-gray-200">
      <div class="flex space-x-2">
        <div class="w-1/4 p-3 border-r border-gray-200 text-center flex flex-col space-y-4">
          <div class="justify-center flex">
            <UserAvatar :user="op" size="lg" />
          </div>
          <div>{{ op.username }}</div>
        </div>
        <div class="w-full p-3">
          <QuestionContent :question="question" />
        </div>
      </div>
      <div class="w-full flex justify-between space-x-5 items-center px-3">
        <div class="text-xs text-gray-400">{{ new Date(question.createdAt).toDateString() }}</div>
        <div v-if="currentUser.username" class="flex items-center space-x-5 text-slate-400">
          <div class="text-sm flex items-center space-x-2">
            <button
              class="flex cursor-pointer hover:text-slate-700 smooth outline-none"
              :class="{ 'text-red-500': vote && vote.type === 'up' }"
              @click="doUpvote"
              :disabled="currentUser.id === question.userId || vote"
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
              :class="{ 'text-red-500': vote && vote.type === 'down' }"
              @click="doDownvote"
              :disabled="currentUser.id === question.userId || vote"
            >
              <MinusIcon class="w-2" />
              <MinusIcon class="w-2" />
            </button>
          </div>
          <ButtonActionPrimary
            label="Reply"
            @button-click="showReplyForm = true"
            v-if="question.active"
          ></ButtonActionPrimary>
        </div>
      </div>
    </div>
  </div>

  <div v-if="loadingAnswers">... loading answers ...</div>
  <div v-if="!loadingAnswers">
    <div class="py-3 pl-5">Answers: {{ answers.length }}</div>
    <!--    <div v-if="bestAnswer">-->
    <!--      <Answer :answer="bestAnswer" :owner="question.userId" />-->
    <!--    </div>-->
    <div class="flex flex-col" v-for="(answer, index) of answers" :key="index">
      <div v-if="index > 0" class="h-7 border-l-2 border-gray-200 w-[95%] mx-auto">
        <!-- spacing only -->
      </div>
      <Answer :answer="answer" :owner="question.userId" :has-best-answer="getBestAnswer()" />
    </div>
  </div>

  <Transition name="modal">
    <Modal
      :title="`Replying to: ${question.title}`"
      v-if="showReplyForm"
      @close-modal="showReplyForm = false"
      :allow-full="true"
    >
      <form @submit.prevent>
        <TextEditor @update-content="(value: String) => (replyContent = value)"></TextEditor>
        <div class="flex justify-end pt-3">
          <ButtonActionPrimary @button-click="doSubmitAnswer" class="flex space-x-2">
            <div>Send</div>
            <Spinner v-if="submittingAnswer" class="w-5 ml-2" />
          </ButtonActionPrimary>
        </div>
      </form>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, reactive, ref, watch } from 'vue';
  import {
    getMyVote,
    getOPData,
    getQuestion,
    submitVote,
  } from '../../Services/Question/QuestionService';
  import { IAnswer } from '../../Interfaces/Question/IQuestion';
  import { useRoute } from 'vue-router';
  import { getAnswers, submitAnswer } from '../../Services/Question/AnswerService';
  import { useUser } from '../../Stores/UserStore';
  import { useQuestion } from '../../Stores/QuestionStore';
  import { storeToRefs } from 'pinia';
  import { PlusIcon, MinusIcon } from '@heroicons/vue/solid';
  import { IBus } from '../../Interfaces/IBus';
  import Answer from '../../Components/Question/Answer.vue';
  import QuestionContent from '../../Components/Question/QuestionContent.vue';
  import Modal from '../../Components/Modal/Modal.vue';
  import Button from '../../Components/Buttons/Button.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import TextEditor from '../../Components/Form/TextEditor.vue';
  import UserAvatar from '../../Components/User/UserAvatar.vue';

  const $bus: IBus | undefined = inject('$bus');
  const route = useRoute();
  const answers = ref<IAnswer[]>([]);
  const showReplyForm = ref<boolean>(false);
  const replyContent = ref<string>('');

  const loadingQuestion = ref<boolean>(true);
  const loadingAnswers = ref<boolean>(true);
  const submittingAnswer = ref<boolean>(false);
  const changing = ref<boolean>(false); // refers to changing the vote value
  const bestAnswer = ref<any>();

  const userStore = useUser();
  const { currentUser } = storeToRefs(userStore);
  const questionStore = useQuestion();
  const { question, votes, vote, op } = storeToRefs(questionStore);

  const state = reactive({
    canVote: false,
  });

  onBeforeMount(async () => {
    getQuestionData();
    $bus?.listen('best-answer', doMarkAsBest);
  });

  watch(answers, () => {
    bestAnswer.value = answers.value.filter((a) => a.best === true)[0];
  });

  function getQuestionData() {
    getQuestion(<string>route.params.id).then(async (d) => {
      question.value = d.question;
      votes.value = d.question.votes;
      loadingQuestion.value = false;
      if (currentUser.value.username) {
        await doGetMyVote();
      }
      await doGetOPData();
      getAnswers(<string>route.params.id).then((d) => {
        answers.value = d.answers;
        if (answers.value.filter((a) => a.best === true).length > 0) {
          questionStore.setBestAnswer(true);
        }
        loadingAnswers.value = false;
      });
    });
  }

  function doGetMyVote() {
    return getMyVote(question.value.id!.toString()).then((d) => {
      if (d !== null) {
        questionStore.setVote(d);
      }
    });
  }

  function doGetOPData() {
    return getOPData(question.value.userId!.toString()).then((d) => {
      questionStore.setOp(d.user);
    });
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
        questionStore.doVote('up');
        changing.value = true;
        setTimeout(() => {
          changing.value = false;
        }, 500);
        state.canVote = false;
        // questionStore.setVoted(true);
        // questionStore.setType('up');
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
        questionStore.doVote('down');
        changing.value = true;
        setTimeout(() => {
          changing.value = false;
        }, 500);
        state.canVote = false;
        // questionStore.setVoted(true);
        // questionStore.setType('down');
      })
      .catch((e) => {
        if (e.response) {
          console.log(e);
        }
      });
  }

  function getBestAnswer(): boolean {
    return questionStore.hasBestAnswer;
  }

  function doMarkAsBest(id: number) {
    answers.value.map((answer) => {
      if (answer.id === id) {
        answer.best = true;
        questionStore.setBestAnswer(true);
      }
    });
  }
</script>
