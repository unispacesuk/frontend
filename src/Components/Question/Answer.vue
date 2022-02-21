<template>
  <div class="relative group flex">
    <div
      class="w-full h-full bg-gray-200 smooth rounded-md absolute group-hover:rotate-[0.4deg] z-0"
    ></div>
    <div
      :class="{ 'bg-green-100': best }"
      class="p-3 w-full bg-white border border-slate-200 rounded-md z-10"
    >
      <div class="flex items-center border-b border-gray-200 pb-3 justify-between px-3">
        <div class="flex items-center space-x-2">
          <div>
            <img
              v-if="answer.avatar"
              :src="avatarBase + answer.avatar"
              alt="avatar"
              class="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            {{ answer.username }}
          </div>
        </div>
        <div v-if="user.id === owner && !best">
          <ButtonPrimary class="flex space-x-2 items-center" @click="markAsBest">
            <div>Mark as Best</div>
            <Spinner class="w-5" v-if="markingAsBest" />
          </ButtonPrimary>
        </div>
      </div>
      <div class="py-3 pl-3">
        {{ answer.content }}
      </div>
      <div class="text-xs text-gray-500">{{ answer.createdAt }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUser } from '../../Stores/UserStore';
import ButtonPrimary from '../Buttons/ButtonPrimary.vue';
import Spinner from '../../Icons/Util/Spinner.vue';

const avatarBase = inject('avatarBase');
const userStore = useUser();
const { user } = storeToRefs(userStore);

const markingAsBest = ref<boolean>(false);

const props: any = defineProps({
  answer: Object as any,
  owner: Number,
  best: {
    type: Boolean,
    default: false,
  },
});

function markAsBest() {
  markingAsBest.value = true;
  setTimeout(() => {
    markingAsBest.value = false;
  }, 3000);
}
</script>
