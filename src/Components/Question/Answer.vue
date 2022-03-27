<template>
  <div class="relative group flex">
    <div
      class="w-full h-full bg-gray-200 smooth rounded-md absolute group-hover:rotate-[0.4deg] z-0"
    ></div>
    <div
      :class="{ 'bg-green-100': answer.best }"
      class="p-3 w-full bg-white border border-slate-200 rounded-md z-10"
    >
      <div class="flex items-center border-b border-gray-200 pb-3 justify-between px-3">
        <div class="flex items-center space-x-2">
          <div>
            <img
              :src="
                answer.avatar ? avatarBase + answer.avatar : avatarApi + `${answer.username}.svg`
              "
              alt="avatar"
              class="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            {{ answer.username }}
          </div>
        </div>
        <div v-if="user.id === owner && !hasBestAnswer">
          <ButtonActionSecondary class="flex space-x-2" @button-click="doMarkAsBest">
            <div>Mark as Best</div>
            <Spinner class="w-5" v-if="markingAsBest" />
          </ButtonActionSecondary>
        </div>
      </div>
      <div class="py-3 pl-3" v-html="answer.content"></div>
      <div class="text-xs text-gray-500">{{ new Date(answer.createdAt).toDateString() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { markAsBest } from '../../Services/Question/AnswerService';
  import { IBus } from '../../Interfaces/IBus';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const avatarBase = inject('avatarBase');
  const avatarApi = inject('avatarApi');
  const userStore = useUser();
  const { user } = storeToRefs(userStore);

  const markingAsBest = ref<boolean>(false);

  const $bus: IBus | undefined = inject('$bus');

  const props: any = defineProps({
    answer: Object as any,
    owner: Number,
    best: {
      type: Boolean,
      default: false,
    },
    hasBestAnswer: Boolean,
  });

  function doMarkAsBest() {
    markingAsBest.value = true;

    return markAsBest(props.answer.id).then((d) => {
      markingAsBest.value = false;
      $bus?.emit('best-answer', props.answer.id);
    });
  }
</script>
