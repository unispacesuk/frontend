<template>
  <div class="mb-20">
    <div v-if="threads.length === 0">There are no threads on this board.</div>
    <div v-for="thread of threads">
      {{ thread.title }}
      <br />
      {{ thread.username }}
      <!--      <div v-html="thread.description"></div>-->
    </div>
  </div>

  <NewThread @submit-form="addNewThread" />
  <!--  <div v-if="showToast">-->
  <!--    <Toast text="New Thread Added!" @toast-close="showToast = false" />-->
  <!--  </div>-->
  <div v-if="toasts.length > 0" class="fixed bottom-10 left-10">
    <div v-for="toast of toasts" class="w-auto">
      <Toast :text="toast.text" @toast-close="removeToast(toast.date)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getBoard, addThread } from '../../Services/BoardsService';
import NewThread from '../../Components/Board/NewThread.vue';
import { IThread } from '../../Interfaces/IThread';
import Toast from '../../Components/Toast/Toast.vue';

export default defineComponent({
  name: 'Board',
  components: { Toast, NewThread },
  emits: ['reset-form'],
  data() {
    return {
      threads: <IThread[]>[],
      showToast: <boolean>false,
      toasts: <any[]>[],
    };
  },
  beforeMount() {
    getBoard(this.$route.params.id).then((data) => {
      this.threads = data.body.threads;
    });
  },
  methods: {
    async addNewThread(newThread: IThread) {
      const data = await addThread(newThread);
      this.threads.push(data.body.thread);
      this.toasts.unshift({
        date: Date.now(),
        text: 'New thread added.',
      });
    },
    removeToast(date: Date) {
      this.toasts = this.toasts.filter((t) => t.date !== date);
    },
  },
});
</script>

<style scoped></style>
