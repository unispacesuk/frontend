<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-between border-b border-gray-200 items-center">
      <div class="pb-3 pl-3 text-2xl">{{ question.title }}</div>
      <div>
        <button
          class="text-gray-300 outline-none hover:text-gray-700"
          @click="moreMenu = !moreMenu"
        >
          <DotsVerticalIcon class="w-5" />
        </button>
        <div class="relative">
          <div id="moreMenu" v-if="moreMenu" class="more-menu smooth flex flex-col">
            <button v-if="user.id === question.userId || user.roleId === 1" @click="editing = true">
              Edit
            </button>
            <button @click="copyToClipboard">Share</button>
            <button
              v-if="user.id === question.userId || user.roleId === 1"
              @click="doDeleteQuestion"
            >
              <Spinner v-if="loading" class="w-5 mx-auto" />
              <span v-if="!loading">Delete</span>
            </button>
            <button v-if="user.id === question.userId || user.roleId === 1">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 whitespace-pre-line" v-html="question.description"></div>
  </div>

  <Modal v-if="editing" @close-modal="editing = false">
    <QuestionContentEdit :question="question" />
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, inject, onBeforeMount, ref } from 'vue';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import { useUser } from '../../Stores/UserStore';
import { storeToRefs } from 'pinia';
import Modal from '../Modal/Modal.vue';
import QuestionContentEdit from './QuestionContentEdit.vue';
import { IBus } from '../../Interfaces/IBus';
import { useRoute, useRouter } from 'vue-router';
import { IQuestion } from '../../Interfaces/Question/IQuestion';
import { deleteQuestion } from '../../Services/Question/QuestionService';
import Spinner from '../../Icons/Util/Spinner.vue';

const $bus: IBus | undefined = inject('$bus');
const urlBase = inject<string>('urlBase');
const userStore: any = storeToRefs(useUser());
const user = userStore.user;
const route = useRoute();
const router = useRouter();

const loading = ref<boolean>(false);
const moreMenu = ref<boolean>(false);
const editing = ref<boolean>(false);

const props = defineProps<{
  question: IQuestion;
}>();

const question = ref(props.question);

onBeforeMount(() => {
  $bus?.listen('question-update-success', updateQuestion);
})

function updateQuestion(q: IQuestion) {
  question.value = q;
  editing.value = false;
  // $bus?.emit('add-toast', 'Question edited.', 'success');
  moreMenu.value = false;
}

function doDeleteQuestion() {
  loading.value = true;
  deleteQuestion(question.value.id!)
    .then((r) => {
      $bus?.emit('add-toast', 'Question deleted.', 'success');
      router.push('/questions');
    })
    .catch((e) => {
      console.log(e.response);
      $bus?.emit('add-toast', 'Could not delete question.', 'error');
    });
}

function copyToClipboard() {
  navigator.clipboard
    .writeText(urlBase + route.fullPath)
    .then(() => {
      $bus?.emit('add-toast', 'Link copied to clipboard.', 'success');
    })
    .catch((e) => console.log(e));
  moreMenu.value = false;
}
</script>
