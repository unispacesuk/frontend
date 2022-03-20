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
            <div v-if="user.username" class="flex space-x-3">
              <div class="space-x-3" v-if="user.roleId === 1 || user.id === thread.userId">
                <!-- Placeholder buttons -->
                <Button @click="showConfirmDelete = true" type="error">Delete</Button>
                <Button @click="handleEditThread" type="primary">Edit</Button>
              </div>
              <Button @click="handleReplyThread" type="primary">Reply</Button>
            </div>
          </div>
          <div class="p-3" v-html="thread.content"></div>
        </div>
      </div>

      <ThreadBottom :thread="thread" />

      <ThreadReplies :thread-id="thread.id" />
    </div>
  </div>

  <!-- TODO: Send these modals to individual SFC -->
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

  <Modal v-if="isEditing" @close-modal="isEditing = false">
    <div class="text-lg px-3 pb-3 border-b border-gray-200">Editing Thread</div>
    <div class="flex flex-col space-y-2 pt-3">
      <Input :input-value="thread.title" @input-change="(v) => (newThreadTitle = v)" />

      <TextEditor />
    </div>
    <div class="flex space-x-2 justify-end pt-5">
      <Button type="error" @button-click="isEditing = false" :disabled="editLoading">Cancel</Button>
      <Button type="success" @button-click="doThreadEdit" class="flex space-x-2">
        <div>Save</div>
        <Spinner v-if="editLoading" class="w-5" />
      </Button>
    </div>
  </Modal>

  <!-- Add reply modal -->
  <Modal v-if="isReplying" @close-modal="isReplying = false" :allow-full="true">
    <div class="text-xl border-b border-gray-200 px-3 pb-3">Replying to: {{ thread.title }}</div>
    <TextEditor @update-content="handleReplyThreadContent" />

    <div class="flex justify-end space-x-2 mt-3">
      <Button type="error" v-if="!replySending" @button-click="handleReplyThreadClose">
        Cancel
      </Button>
      <Button type="success" @button-click="doReplySend" class="flex space-x-2">
        <div>Submit</div>
        <Spinner class="w-5" v-if="replySending" />
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    addThreadReply,
    deleteThread,
    editThread,
    getThread,
  } from '../../Services/Board/BoardsService';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { IThread } from '../../Interfaces/Board/IThread';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../../Components/Modal/Modal.vue';
  import UserInfo from '../../Components/Board/UserInfo.vue';
  import Button from '../../Components/Buttons/Button.vue';

  import { ArrowLeftIcon } from '@heroicons/vue/solid';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import Input from '../../Components/Form/Input.vue';
  import ThreadBottom from '../../Components/Board/ThreadBottom.vue';
  import ThreadReplies from '../../Components/Board/ThreadReplies.vue';
  import TextEditor from '../../Components/Form/TextEditor.vue';

  const $bus = inject<IBus>('$bus');
  const route = useRoute();
  const router = useRouter();
  const loading = ref<boolean>(true);
  const thread = ref<IThread>();

  const showConfirmDelete = ref<boolean>(false);
  const deleteLoading = ref<boolean>(false);
  const isEditing = ref<boolean>(false);
  const editLoading = ref<boolean>(false);

  const isReplying = ref<boolean>(false);
  const replyContent = ref<string>('');
  const replySending = ref<boolean>(false);

  const invalidThread = ref<boolean>(false);

  const { user } = storeToRefs(useUser());

  const newThreadTitle = ref<string>('');
  const newThreadContent = ref<string>('');

  onBeforeMount(() => {
    const id: string | string[] = route.params['threadId'];
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
        // console.log(e.response);
        deleteLoading.value = false;
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function handleEditThread() {
    isEditing.value = true;
  }

  function doThreadEdit() {
    if (!newThreadContent.value && !newThreadTitle.value) {
      return $bus?.emit('add-toast', 'You are trying to update nothing.', 'error');
    }

    editLoading.value = true;
    const data = {
      title: newThreadTitle.value,
      content: newThreadContent.value,
    };

    editThread(thread.value!.id, data)
      .then((d) => {
        // console.log(d);
        $bus?.emit('add-toast', 'Thread updated.');
        thread.value!.title = newThreadTitle.value || thread.value!.title;
        thread.value!.content = newThreadContent.value || thread.value!.content;
        newThreadTitle.value = '';
        newThreadContent.value = '';
        isEditing.value = false;
        editLoading.value = false;
      })
      .catch((e) => {
        // console.log(e.response);
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        editLoading.value = false;
      });
  }

  function handleReplyThread() {
    isReplying.value = true;
  }

  function handleReplyThreadClose() {
    isReplying.value = false;
  }

  function handleReplyThreadContent(content: string) {
    replyContent.value = content;
  }

  function doReplySend() {
    if (!replyContent.value) {
      return $bus?.emit('add-toast', 'No content to reply.', 'error');
    }

    replySending.value = true;
    addThreadReply(thread.value!.id, { content: replyContent.value })
      .then((d) => {
        $bus?.emit('add-reply-success', d);
        replySending.value = false;
        isReplying.value = false;
      })
      .catch((e) => {
        if (e.response) {
          console.log(e);
        }

        $bus?.emit('add-reply-error');
        replySending.value = false; // if something goes wrong keep the dialog and the reply content...
      });
  }
</script>

<style lang="scss"></style>
