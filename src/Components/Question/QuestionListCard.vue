<!-- TODO: Mobile ready this -->
<template>
  <div class="question-list-card card-hover">
    <div class="card-top">
      <!-- User info -->
      <div class="user-info">
        <QuestionUserInfo :user-id="question.userId" />
      </div>

      <div class="content w-full">
        <div class="text-lg whitespace-nowrap overflow-hidden overflow-ellipsis pr-4">
          <router-link :to="{ name: 'question', params: { id: question.id } }">
            {{ question.title }}
          </router-link>
        </div>
        <div class="text-sm text-slate-400">
          Asked on: {{ moment(question.createdAt).format('MMM ddd YYYY') }}
        </div>
        <!--        {{ question.description }}<br /><br />-->
        <div class="flex space-x-2 overflow-x-auto mt-3">
          <div v-for="tag of question.tags">
            <router-link :to="`/questions/search?tag=${tag}`">
              <Tag :tag="tag" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- More Icon -->
      <div class="relative" @focusout.capture="onMoreMenuFocusOut">
        <button
          class="text-gray-300 hover:text-gray-700 absolute right-0 smooth outline-none"
          @click="moreMenu = !moreMenu"
        >
          <DotsVerticalIcon class="w-5" v-if="!moreMenu" />
          <XCircleIcon class="w-5" v-if="moreMenu" />
        </button>
        <Transition name="modal">
          <div id="moreMenu" v-if="moreMenu" class="more-menu smooth flex flex-col">
            <!--        <div>Edit</div>-->
            <button @click="copyToClipboard(question.id)">Share</button>
            <button
              v-if="user.id === question.userId || user.roleId === 1"
              @click="doDelete(question.id)"
            >
              Delete
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- More info -->
    <div class="card-bottom">
      <div class="bg-gray-100 rounded-md px-3 py-2 flex space-x-2 cursor-pointer hover:bg-gray-200">
        <ReplyIcon class="w-5" />
        <div>{{ question.answers }}</div>
      </div>
      <div class="bg-gray-100 rounded-md px-3 py-2 flex space-x-2 cursor-pointer hover:bg-gray-200">
        <div class="flex -space-x-2">
          <PlusSmIcon class="w-5" />
          <PlusSmIcon class="w-5" />
        </div>
        <div>{{ question.votes }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, PropType, ref } from 'vue';
  import { IQuestion } from '../../Interfaces/Question/IQuestion';
  import { DotsVerticalIcon, XCircleIcon, ReplyIcon, PlusSmIcon } from '@heroicons/vue/solid';
  import { deleteQuestion } from '../../Services/Question/QuestionService';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { IBus } from '../../Interfaces/IBus';
  import QuestionUserInfo from './QuestionListCardUserInfo.vue';
  import Tag from '../Tag/Tag.vue';
  import moment from 'moment';

  interface QuestionProp {
    question: IQuestion;
    moreMenu: boolean;
  }

  export default defineComponent({
    name: 'QuestionListItem',
    components: { QuestionUserInfo, Tag, DotsVerticalIcon, XCircleIcon, ReplyIcon, PlusSmIcon },
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
      const Bus: IBus = $bus;
      const userStore = useUser();
      const { user } = storeToRefs(userStore);

      const urlBase = inject('urlBase');

      addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          return (moreMenu.value = false);
        }
      });

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
        user,
        Bus,
        urlBase,
        moment,
      };
    },
    methods: {
      async doDelete(questionId: number) {
        this.emitDeleteRequest();
        deleteQuestion(questionId)
          .then((r) => {
            if (r.response) {
              this.Bus.emit('add-toast', 'Question deleted.', 'success');
              this.emitDeleteSuccess();
            }
          })
          .catch((e) => {
            // console.log(e);
            this.Bus.emit('add-toast', e.response.data.error, 'error');
            this.emitDeleteSuccess();
          });
      },
      copyToClipboard(questionId: number) {
        navigator.clipboard
          .writeText(`${this.urlBase}/questions/${questionId}`)
          .then(() => {
            this.copyToClipboardToast();
          })
          .catch((e) => console.log(e));
        this.moreMenu = false;
      },
      onMoreMenuFocusOut() {
        this.moreMenu = false;
      },
    },
  });
</script>

<style scoped lang="scss">
  .question-list-card {
    @apply h-auto border border-slate-200 rounded-md p-3 shadow-sm;

    .card-top {
      @apply flex space-x-4;
    }

    .card-bottom {
      @apply flex space-x-2 justify-end;
    }

    .user-info {
      @apply hidden md:block shrink-0 text-center;
    }

    .content {
      @apply flex-shrink overflow-hidden;
    }
  }
</style>
