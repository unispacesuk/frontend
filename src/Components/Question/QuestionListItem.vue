<!-- TODO: Mobile ready this -->
<template>
  <div
    class="w-full border border-slate-200 rounded-md p-3 flex space-x-4 shadow-sm card-hover relative"
  >
    <!-- User info -->
    <div class="hidden md:block w-[150px] flex-none text-center flex">
      <QuestionUserInfo :user-id="question.userId" />
    </div>

    <!-- Middle side -->
    <div class="w-full relative">
      <div class="text-xl">
        <router-link :to="{ name: 'question', params: { id: question.id } }">
          {{ question.title }}
        </router-link>
      </div>
      <div class="text-sm text-slate-400">
        Asked on: {{ new Date(question.createdAt).toLocaleString() }}
      </div>
      <!--        {{ question.description }}<br /><br />-->
      <div class="flex space-x-2 absolute bottom-0 w-full overflow-x-auto">
        <div v-for="tag of question.tags">
          <router-link :to="`/questions/search?tag=${tag}`">
            <Tag :tag="tag" />
          </router-link>
        </div>
      </div>
    </div>

    <!-- More info -->
    <div class="w-1/5 relative">
      <div>Answers: {{question.answers}}</div>
      <div>Votes: {{ question.votes }}</div>
    </div>

    <!-- More Icon -->
    <div>
      <button
        class="text-gray-300 hover:text-gray-700 smooth outline-none"
        @click="moreMenu = !moreMenu"
      >
        <DotsVerticalIcon class="w-5" v-if="!moreMenu" />
        <XCircleIcon class="w-5" v-if="moreMenu" />
      </button>
      <div id="moreMenu" v-if="moreMenu" class="more-menu smooth flex flex-col">
        <!--        <div>Edit</div>-->
        <button @click="copyToClipboard(question.id)">Share</button>
        <button @click="doDelete(question.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref } from 'vue';
import { IQuestion } from '../../Interfaces/Question/IQuestion';
import Tag from '../Tag/Tag.vue';
import { DotsVerticalIcon, XCircleIcon } from '@heroicons/vue/solid';
import { deleteQuestion } from '../../Services/Question/QuestionService';
import QuestionUserInfo from './QuestionUserInfo.vue';

interface QuestionProp {
  question: IQuestion;
  moreMenu: boolean;
}

export default defineComponent({
  name: 'QuestionListItem',
  components: { QuestionUserInfo, Tag, DotsVerticalIcon, XCircleIcon },
  props: {
    question: {
      type: Object as PropType<IQuestion>,
      required: true,
    },
    moreMenu: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: QuestionProp) {
    const question = ref<IQuestion>(props.question);
    const moreMenu = ref(props.moreMenu);
    const $bus: any = inject('$bus');

    addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        return (moreMenu.value = false);
      }
    });
    // addEventListener('click', (e) => {
    //   console.log(e.target);
    // });
    const emitDeleteRequest = () => {
      $bus.emit('question-delete-request');
    };
    const emitDeleteSuccess = () => {
      $bus.emit('question-delete-success');
    };
    const copyToClipboardToast = () => {
      $bus.emit('add-toast', 'Link copied to clipboard.');
    };

    return {
      question,
      moreMenu,
      emitDeleteRequest,
      emitDeleteSuccess,
      copyToClipboardToast,
    };
  },
  methods: {
    async doDelete(questionId: number) {
      this.emitDeleteRequest();
      deleteQuestion(questionId)
        .then((r) => {
          if (r.body.m) {
            this.emitDeleteSuccess();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    copyToClipboard(questionId: number) {
      navigator.clipboard
        .writeText(`http://app.unispaces.test/questions/${questionId}`)
        .then(() => {
          this.copyToClipboardToast();
        })
        .catch((e) => console.log(e));
      this.moreMenu = false;
    },
  },
});
</script>
