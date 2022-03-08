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
  <div v-if="user.id">
    <NewThread @submit-form="doAddNewThread" :loading="newThreadLoading" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getBoard, addThread } from '../../Services/Board/BoardsService';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { IThread } from '../../Interfaces/Board/IThread';
  import { IBus } from '../../Interfaces/IBus';
  import Thread from '../../Components/Board/Thread.vue';
  import Pagination from '../../Components/Pagination/Pagination.vue';
  import ThreadsSkeleton from '../../Components/Skeletons/ThreadsSkeleton.vue';
  import NewThread from '../../Components/Board/Forms/NewThread.vue';
  import newThread from '../../Components/Board/Forms/NewThread.vue';

  const $bus = inject<IBus>('$bus');
  const route = useRoute();
  const router = useRouter();
  const loading = ref<boolean>(true);
  const newThreadLoading = ref<boolean>(false);
  const threads = ref<IThread[]>([]);

  const { user } = storeToRefs(useUser());

  onBeforeMount(() => {
    const id: string | string[] = route.params['id'];
    getBoard(id)
      .then((d) => {
        threads.value = d.threads;
        loading.value = false;
      })
      .catch((e) => {
        console.log(e.response);
        loading.value = false;
        $bus?.emit('add-toast', 'Something went wrong. Please reload the page.', 'error');
      });
  });

  interface INewBoard {
    title: string;
    content: string;
  }
  function doAddNewThread(data: INewBoard) {
    newThreadLoading.value = true;
    console.log('hi');
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
        console.log(d);
        newThreadLoading.value = false;
        router.push(`/thread/${d.thread.id}`);
        // return $bus?.emit('submit-success');
        // return $bus?.emit('add-toast', 'Something went wrong. Please try again.', 'error');
      })
      .catch((e) => {
        console.log(e.response);
        newThreadLoading.value = false;
        return $bus?.emit('add-toast', 'Something went wrong. Please try again.', 'error');
      });
  }
</script>
