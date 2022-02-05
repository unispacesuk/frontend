<template>
  <div class="mb-20">
    <div v-if="loading">
      <ThreadsSkeleton />
      <ThreadsSkeleton />
      <ThreadsSkeleton />
    </div>

    <div v-if="!loading">
      <div v-if="threads.length === 0">There are no threads on this board.</div>
      <div v-for="thread of threads" :key="thread.id">
        <router-link :to="{ name: 'thread', params: { id: thread.id } }">
          <Thread :thread="thread" />
        </router-link>
      </div>

      <!--    <Pagination :pages="5" />-->
    </div>
  </div>
  <NewThread @submit-form="addNewThread" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getBoard, addThread } from '../../Services/Board/BoardsService';
import NewThread from '../../Components/Board/Forms/NewThread.vue';
import { IThread } from '../../Interfaces/Board/IThread';
import Toasts from '../../Components/Toast/Toasts.vue';
import Thread from '../../Components/Board/Thread.vue';
import Pagination from '../../Components/Pagination/Pagination.vue';
import ThreadsSkeleton from '../../Components/Skeletons/ThreadsSkeleton.vue';

export default defineComponent({
  name: 'Board',
  components: { ThreadsSkeleton, Pagination, Thread, Toasts, NewThread },
  emits: ['reset-form'],
  data() {
    return {
      threads: <IThread[]>[],
    };
  },
  setup() {
    const loading = ref<boolean>(true);

    return {
      loading,
    };
  },
  beforeMount() {
    getBoard(this.$route.params.id).then((data) => {
      this.threads = data.body.threads;
      this.loading = false;
    });
  },
  methods: {
    async addNewThread(newThread: IThread) {
      const data = await addThread(newThread);
      this.threads.unshift(data.body.thread);
      this.$bus.emit('add-toast', 'New thread added.');
    },
  },
});
</script>
