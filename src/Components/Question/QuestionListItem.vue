<template>
  <div class="w-full border border-slate-200 rounded-md p-3 flex space-x-4 shadow-sm card-hover">
    <!-- User info -->
    <div class="px-10 space-y-2">
      <div class="w-[70px] h-[70px] bg-red-200 rounded-full"></div>
      <div>ricdotnet</div>
    </div>

    <!-- Middle side -->
    <div class="w-full relative">
      <div class="text-xl">
        <router-link :to="{ name: 'question', params: { id: question.id } }">
          {{ question.title }}
        </router-link>
      </div>
      <div class="text-sm text-slate-400">Asked on: {{ new Date(question.createdAt).toLocaleString() }}</div>
      <!--        {{ question.description }}<br /><br />-->
      <div class="flex space-x-2 absolute bottom-0">
        <div v-for="tag of question.tags">
          <Tag :tag="tag" />
        </div>
      </div>
    </div>

    <!-- More info -->
    <!--      <div class="w-1/5">hey</div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IQuestion } from '../../Interfaces/Question/IQuestion';
import Tag from '../Tag/Tag.vue';

interface QuestionProp {
  question: IQuestion;
}

export default defineComponent({
  name: 'QuestionListItem',
  components: { Tag },
  props: {
    question: {
      type: Object as PropType<IQuestion>,
      required: true,
    },
  },
  setup(props: QuestionProp) {
    const question = ref<IQuestion>(props.question);

    return {
      question,
    };
  },
});
</script>
