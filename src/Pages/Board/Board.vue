<template>
  <div class="mb-20">
    <div v-if="loading">
      <ThreadsSkeleton />
      <ThreadsSkeleton />
      <ThreadsSkeleton />
    </div>

    <div v-else-if="!state.boardExists || !state.canView" class="text-center text-2xl mt-10">
      <div>The board you are looking for does not exist.</div>
      <ButtonActionSecondary label="Go Back" @button-click="router.back()"></ButtonActionSecondary>
    </div>

    <div v-else>
      <div class="px-6 py-3 border-b border-gray-200 mb-2">
        <div class="text-2xl">{{ state.boardData.catTitle }}</div>
        <div class="text-lg px-3 truncate">{{ state.boardData.title }}</div>
      </div>
      <div v-if="!state.threads.length">
        <Empty label="There are no threads on this board." />
      </div>
      <div v-for="(thread, index) of state.threads" :key="index">
        <router-link :to="{ name: 'thread', params: { threadId: thread.thread._id } }">
          <Thread :thread="thread" />
        </router-link>
      </div>

      <!--    <Pagination :pages="5" />-->
    </div>
  </div>
  <div v-if="currentUser.id && boardExists && state.canView">
    <NewThread @submit-form="doAddNewThread" :loading="newThreadLoading" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, inject, reactive, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getBoard, addThread } from '../../Services/Board/BoardsService';
  import { useUser } from '../../Stores/UserStore';
  import { IThread } from '../../Interfaces/Board/IThread';
  import { IBus } from '../../Interfaces/IBus';
  import Thread from '../../Components/Board/ThreadListCard.vue';
  import ThreadsSkeleton from '../../Components/Skeletons/ThreadsSkeleton.vue';
  import NewThread from '../../Components/Board/Forms/NewThread.vue';
  import Pagination from '../../Components/Pagination/Pagination.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import Empty from '../../Components/Util/Empty.vue';

  const $bus = inject<IBus>('$bus');
  const route = useRoute();
  const router = useRouter();
  const loading = ref<boolean>(true);
  const newThreadLoading = ref<boolean>(false);
  const boardExists = ref<boolean>(true);

  const { currentUser } = useUser();

  // temp interface
  interface IBoardData {
    title: string;
    access: string;
    catTitle: string;
  }

  const state = reactive({
    boardData: <IBoardData>{},
    threads: [],
    canView: computed(() => {
      if (currentUser.roleId === 1) {
        return true;
      }

      if (currentUser.roleId !== 1 && state.boardData.access === 'all') {
        return true;
      }

      return false;
    }),
    boardExists: false,
  });

  onBeforeMount(() => {
    const id: string | string[] = route.params['boardId'];
    getBoard(id)
      .then((d) => {
        state.threads = d.threads[0].threads;
        state.boardData = {
          title: d.threads[0].board_title,
          catTitle: d.threads[0].cat_title,
          access: d.threads[0].access,
        };
        loading.value = false;
        state.boardExists = true;
      })
      .catch(() => {
        loading.value = false;
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  });

  interface INewBoard {
    title: string;
    content: string;
  }
  function doAddNewThread(data: INewBoard) {
    newThreadLoading.value = true;
    if (!data.title) {
      newThreadLoading.value = false;
      return $bus?.emit('add-toast', 'You must enter a title.', 'error');
    }

    if (!data.content) {
      newThreadLoading.value = false;
      return $bus?.emit('add-toast', 'You must add content to your thread.', 'error');
    }

    addThread(data)
      .then((d) => {
        newThreadLoading.value = false;
        router.push(`/thread/${d.thread.id}`);
        // return $bus?.emit('submit-success');
        // return $bus?.emit('add-toast', 'Something went wrong. Please try again.', 'error');
      })
      .catch(() => {
        newThreadLoading.value = false;
        return $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }
</script>
