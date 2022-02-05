<template>
  <div v-if="loading">... loading thread ...</div>
  <div v-if="!loading" class="flex flex-col">
    <!-- Page header -->
    <div class="py-2 px-10 border-b border-slate-200">
      <!-- TEMP BUTTON -->
      <button @click="$router.back()" class="flex bg-blue-100">
        <Left class="w-6" />
        Go Back
      </button>
    </div>

    <!-- Thread content -->
    <div class="p-3 flex">
      <!-- User info -->
      <div class="w-1/4 h-auto text-center">hi</div>
      <!-- OP content -->
      <div class="w-3/4 border-l border-slate-200 px-3">
        <div class="p-3 border-b border-slate-200 flex items-center justify-between">
          <div class="text-2xl">{{ thread.title }}</div>
          <div class="space-x-3">
            <!-- Placeholder buttons -->
            <button>Edit</button>
            <button @click="deleteConfirmModal = true">Delete</button>
          </div>
        </div>
        <div class="p-3">
          {{ thread.content }}
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="deleteConfirmModal" @close-modal="deleteConfirmModal = false">
    <div>
      You sure you want to delete?<br>
      <button @click="doDeleteThread">YES!!!!</button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getThread, deleteThread } from '../../Services/Board/BoardsService';
import Layout from '../../Layouts/Layout.vue';
import { IThread } from '../../Interfaces/Board/IThread';
import Left from '../../Icons/Arrows/Left.vue';
import Modal from '../../Components/Modal/Modal.vue';

export default defineComponent({
  name: 'Thread',
  components: { Modal, Left, Layout },
  data() {
    return {
      deleteConfirmModal: false,
    };
  },
  setup() {
    const route = useRoute();
    let loading = ref<boolean>(true);
    let thread = ref<IThread>();

    const threadId = route.params.id;
    onBeforeMount(async () => {
      // this is string here but bellow is number. weird. params have to be always string
      thread.value = await getThread(<string>threadId);
      loading.value = false;
    });

    return {
      loading,
      thread,
    };
  },
  methods: {
    async doDeleteThread() {
      deleteThread(this.thread!.id).then((r) => {
        this.$router.back();
        this.$bus.emit('add-toast', 'Thread deleted.');
      });
    },
  },
});
</script>
