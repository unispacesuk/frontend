<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-for="reply of state.replies">
      {{ reply }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { toRefs, inject, onBeforeUnmount, onBeforeMount, ref, reactive, computed } from 'vue';
  import { IBus } from '../../Interfaces/IBus';
  import { getAllThreadReplies } from '../../Services/Board/BoardsService';

  const $bus = inject<IBus>('$bus');
  const { params } = toRefs(useRoute());
  const isLoading = ref<boolean>(true);

  onBeforeMount(() => {
    // fetch the replies
    fetchReplies();
  });

  onBeforeUnmount(() => {
    $bus?.forget('add-reply-success');
    $bus?.forget('add-reply-error');
  });

  $bus?.listen('add-reply-success', onReplySuccess);
  $bus?.listen('add-reply-error', onReplyError);

  const state = reactive({
    replies: <any>[],
  });

  function fetchReplies() {
    getAllThreadReplies(params.value.id).then((d) => {
      state.replies = d.response;
      isLoading.value = false;
    });
  }

  function onReplySuccess(d: any) {
    state.replies.push(d.response);
  }

  function onReplyError() {
    $bus?.emit('add-toast', 'Something went wrong.', 'error');
  }
</script>

<style scoped></style>
