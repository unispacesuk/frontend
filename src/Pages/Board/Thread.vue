<template>
  <div v-if="loading">... loading thread ...</div>
  <div v-if="!loading" class="flex flex-col">
    <!-- Page header -->
    <div class="p-3 border-b border-slate-200">
      <!-- TEMP BUTTON -->
      <Button @click="$router.back()" class="flex space-x-2 items-center" type="primary">
        <ArrowLeftIcon class="w-4" />
        <div>Go Back</div>
      </Button>
    </div>
    <div v-if="invalidThread">The thread you are looking for does not exist.</div>
    <div v-if="!invalidThread">
      <!-- Thread content -->
      <div class="flex">
        <!-- User info -->
        <div class="w-1/4 h-auto p-3">
          <UserInfo :username="thread.username" :avatar="thread.avatar" />
        </div>
        <!-- OP content -->
        <div class="w-3/4 border-l border-slate-200 px-3">
          <div class="p-3 border-b border-slate-200 flex items-center justify-between">
            <div class="text-2xl">{{ thread.title }}</div>
            <div class="space-x-3" v-if="user.roleId === 1 || user.id === thread.userId">
              <!-- Placeholder buttons -->
              <Button @click="showConfirmDelete = true" type="error">Delete</Button>
              <Button type="primary">Edit</Button>
            </div>
          </div>
          <div class="p-3" v-html="thread.content"></div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showConfirmDelete" @close-modal="showConfirmDelete = false">
    <div>
      Do you really want to delete this thread?<br />
      <div class="flex space-x-2 py-3">
        <Button type="error" v-if="!deleteLoading" @button-click="showConfirmDelete = false">
          Cancel
        </Button>
        <Button
          type="success"
          @button-click="doDeleteThread"
          class="flex space-x-2"
          :disabled="deleteLoading"
        >
          <div>Confirm</div>
          <Spinner v-if="deleteLoading" class="w-5" />
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { deleteThread, getThread } from '../../Services/Board/BoardsService';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { IThread } from '../../Interfaces/Board/IThread';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../../Components/Modal/Modal.vue';
  import UserInfo from '../../Components/Board/UserInfo.vue';
  import Button from '../../Components/Buttons/Button.vue';

  import { ArrowLeftIcon } from '@heroicons/vue/solid';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const $bus = inject<IBus>('$bus');
  const route = useRoute();
  const router = useRouter();
  const loading = ref<boolean>(true);
  const showConfirmDelete = ref<boolean>(false);
  const deleteLoading = ref<boolean>(false);
  const thread = ref<IThread>();

  const invalidThread = ref<boolean>(false);

  const { user } = storeToRefs(useUser());

  onBeforeMount(() => {
    const id: string | string[] = route.params.id;
    getThread(id)
      .then((d) => {
        loading.value = false;
        if (d.message) {
          return (invalidThread.value = true);
        }
        thread.value = d.thread;
      })
      .catch((e) => {
        console.log(e.response);
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  });

  function doDeleteThread() {
    deleteLoading.value = true;
    deleteThread(thread.value!.id)
      .then(() => {
        router.back();
        $bus?.emit('add-toast', 'Thread deleted.');
      })
      .catch((e) => {
        console.log(e.response);
      });
  }
</script>
